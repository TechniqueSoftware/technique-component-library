import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ACTIONS, SELECTORS } from '@parts/scheduleNScripts/redux'
import { Button } from '@components/atoms'
import { GLOBAL_SELECTOR } from '@redux/global'
import { Multiselect } from 'multiselect-react-dropdown'
import { BUTTON_VARIANT } from '@global/constants'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import { MultiSelect } from 'react-multi-select-component'
import { copySegments } from '@utils/queries'
import styled from './styles.module.scss'
import { FOLLOWUP_STATUS } from './constants'
import { parseTitle, parseLocations } from './utils'
import { sortSegments } from '../../utils'

const ALERT_MSG = 'The selected segments are being copied. You will be notified via email when the job is completed.'

const CopySegments = () => {
  const dispatch = useDispatch()
  const { userId } = useSelector(GLOBAL_SELECTOR.USER)
  const segmentLocations = useSelector(SELECTORS.SEGMENT_LOCATIONS)
  const segmentData = useSelector(SELECTORS.SEGMENT_LIST)
  const { copyInProcess } = useSelector(SELECTORS.SEGMENT_COPY_PROCESS)
  const club = useSelector(GLOBAL_SELECTOR.CLUB)
  const { followUpStatus } = useSelector(SELECTORS.SEGMENT_MODAL_DATA)
  const currentFollowUpStatus = parseInt(followUpStatus, 10)
  const { unrestrictedAdmin } = useSelector(GLOBAL_SELECTOR.USER)

  const [currentSegmentData, setCurrentSegmentData] = useState()
  const [locationFrom, setLocationFrom] = useState()
  const [destinationLocation, setDestinationLocation] = useState()
  const [showList, setShowList] = useState(false)
  const [segmentDataToCopy, setSegmentDataToCopy] = useState([])
  const [destinationSelected, setDestinationSelected] = useState([])

  const disableCopyButton = (segmentDataToCopy.length !== 0 && destinationSelected.length !== 0)
  const hasSegmentLocationsAvailable = segmentLocations.length > 1

  useEffect(() => {
    setSegmentDataToCopy([])
  }, [locationFrom])

  useEffect(() => {
    dispatch(ACTIONS.SEGMENTS.GET_LOCATIONS())
    dispatch(ACTIONS.SEGMENTS.GET_COPY_PROCESS(userId))
  }, [])

  useEffect(() => {
    let filteredSegment
    if (currentFollowUpStatus === FOLLOWUP_STATUS.WEB_LEAD) {
      filteredSegment = segmentData.filter(s => s.followUpStatus === FOLLOWUP_STATUS.WEB_LEAD)
    } else if (currentFollowUpStatus === FOLLOWUP_STATUS.APPT_BOOKED) {
      filteredSegment = segmentData.filter(s => s.followUpStatus === FOLLOWUP_STATUS.APPT_BOOKED)
    } else {
      filteredSegment = segmentData.filter(segment => segment.followUpStatus === FOLLOWUP_STATUS.MEMBER)
    }
    if (JSON.stringify(currentSegmentData) !== JSON.stringify(filteredSegment)) {
      setCurrentSegmentData(filteredSegment)
    }
  }, [followUpStatus, segmentData])

  const fromLocations = unrestrictedAdmin ? [
    { label: club.name, value: club.id },
    ...parseLocations(segmentLocations)] : [
    ...parseLocations(segmentLocations)]

  const toLocations = [...parseLocations(segmentLocations)]

  const onDragEnd = result => {
    const { draggableId } = result
    currentSegmentData.forEach(segment => {
      segment.followUpSegments.forEach(followUpSegment => {
        if (`${followUpSegment.segmentId}` === draggableId) {
          const cloneDataToCopy = [...segmentDataToCopy]
          let segmentHasBeenUpdated = false

          segmentDataToCopy.forEach(segmentDestination => {
            if (segmentDestination.followUpStatus === segment.followUpStatus) {
              const itemAlreadyAdded = segmentDestination.followUpSegments.findIndex(
                element => element.segmentId === followUpSegment.segmentId) > -1
              if (itemAlreadyAdded) {
                segmentHasBeenUpdated = true
              } else {
                const segmentToUpdate = cloneDataToCopy.find(
                  element => element.followUpStatus === segmentDestination.followUpStatus)
                segmentToUpdate.followUpSegments.push(followUpSegment)
                segmentHasBeenUpdated = true
              }
            }
          })
          // order segments alphabetically
          segmentDataToCopy.forEach(element => {
            element.followUpSegments = sortSegments(element.followUpSegments)
          })

          if (!segmentHasBeenUpdated) {
            cloneDataToCopy.push({
              followUpStatus: segment.followUpStatus,
              followUpSegments: [followUpSegment]
            })
          }

          setSegmentDataToCopy(cloneDataToCopy)
        }
      })
    })
  }

  const onDragEndReverse = result => {
    const { source } = result
    const indexToRemove = source.index

    segmentDataToCopy.forEach(segment => {
      const cloneFollowUpSegments = [...segment.followUpSegments]
      cloneFollowUpSegments.splice(indexToRemove, 1)
      segment.followUpSegments = cloneFollowUpSegments
      if (segment.followUpSegments.length === 0) {
        setSegmentDataToCopy([])
      }
    })
  }

  const handleSelect = value => {
    const locationId = value[0].value
    setShowList(locationId !== '')
    setLocationFrom(locationId !== club.id ? locationId : undefined)
    dispatch(ACTIONS.SEGMENTS.GET_LIST({
      locationId: locationId !== club.id ? locationId : undefined,
      clubId: club.id
    }))
  }

  const handleSelectDestination = value => {
    const allLocations = []
    segmentLocations.forEach(location => {
      value.forEach(value => {
        if (location.locationId === value.value) {
          allLocations.push(location.locationId)
        }
      })
    })

    setDestinationLocation(allLocations)
    setDestinationSelected(value)
  }

  const handleCopyAll = () => {
    const allSegments = []
    currentSegmentData.forEach(segment => {
      allSegments.push({ followUpStatus: segment.followUpStatus, followUpSegments: segment.followUpSegments })
    })
    setSegmentDataToCopy(allSegments)
  }

  const handleErase = () => {
    setSegmentDataToCopy([])
  }

  const handleSaveCopy = () => {
    const segmentIdList = []
    segmentDataToCopy.forEach(segment => {
      segment.followUpSegments.forEach(followUpSegment => {
        segmentIdList.push({ segmentId: followUpSegment.segmentId })
      })
    })

    const body = {
      clubId: club.id,
      userId,
      locationId: locationFrom,
      locationIdDestinations: destinationLocation,
      followUpSegments: segmentIdList
    }

    try {
      // NOT USING SAGAS TO CALL API
      copySegments(body)
      dispatch(ACTIONS.SEGMENTS.CLOSE())
      dispatch(ACTIONS.SEGMENTS.SET_ALERT(ALERT_MSG))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Card className='border-0'>
      <Card.Header className={styled.copySegmentsHeader}>
        <div className={styled.selectDestination}>
          <span><h6 style={{ marginRight: '15px' }}> From </h6></span>
          <div className={`w-100 ${hasSegmentLocationsAvailable ? '' : styled.disabledSelect} 
              ${!copyInProcess ? '' : styled.disabledSelect}`}
          >
            <Multiselect
              singleSelect
              placeholder='Select Club/Location'
              options={fromLocations}
              displayValue='label'
              onSelect={handleSelect}
            />
          </div>
        </div>
        <div className={styled.selectDestination}>
          <span><h6 style={{ marginRight: '15px' }}> To </h6></span>
          <MultiSelect
            disabled={!hasSegmentLocationsAvailable || copyInProcess}
            hasSelectAll
            options={toLocations}
            overrideStrings={{
              selectSomeItems: 'Select Location/s',
              allItemsAreSelected: 'All locations are selected.' }}
            value={destinationSelected}
            onChange={handleSelectDestination}
            className={styled.multiselectContent}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <div>
          {copyInProcess
            ? (
              <h6>
                <span className={styled.copySegmentsText}>
                  There are segments still in the process of copying. Please try again later.
                </span>
              </h6>
            ) : (
              <div>
                {hasSegmentLocationsAvailable ? (
                  <h6>
                    {showList ? (
                      <span className={styled.copySegmentsText}>
                        Select the Location to copy the segments to in the ‘To’ dropdown list
                      </span>
                    ) : (
                      <span className={styled.copySegmentsText}>
                        Select the Source (Club or Location-level) to copy Segments from in the ‘From’ dropdown list
                      </span>
                    )}
                  </h6>
                ) : (
                  <h6>
                    <span className={styled.copySegmentsText}>
                      You only have access to a single location so you are unable to copy segments.
                    </span>
                  </h6>
                )}
              </div>
            )}
        </div>
        <div>
          {showList && (
            <Row>
              <Col sm={5}>
                {locationFrom
                  ? <span className={styled.copySegmentsText}><strong>Location-level Segments</strong></span>
                  : <span className={styled.copySegmentsText}><strong>Club-level Segments</strong></span>}

                <Card className='border-0'>
                  <Card.Body>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable key='droppable-1' droppableId='drop-1'>
                        {provided => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            <ListGroup variant='flush'>
                              {currentSegmentData.map(seg => (
                                <ListGroup.Item
                                  className='shadow-none bg-light rounded'
                                  key={seg.followUpStatus}
                                >
                                  <strong>{parseTitle(seg.followUpStatus)}</strong>
                                  {seg.followUpSegments.map((segment, index) => (
                                    <div>
                                      <ListGroup.Item className={styled.groupItem}>
                                        <Draggable
                                          key={segment.segmentId}
                                          draggableId={`${segment.segmentId}`}
                                          index={index}
                                        >
                                          {provided => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className='m-1 mr-6'
                                            >
                                              <p><strong> {segment.name} </strong></p>
                                              {segment.segmentAttributes.map(att => (
                                                <p>{att.attributeType}: { att.attributeValue}</p>
                                              ))}
                                            </div>
                                          )}
                                        </Draggable>
                                      </ListGroup.Item>
                                    </div>
                                  ))}
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={2} className={styled.buttonsGroup}>
                <div>
                  <Button
                    label='>>'
                    variant={BUTTON_VARIANT.LINK}
                    className='ms-auto text-decoration-none'
                    onClick={handleCopyAll}
                  />
                  <Button
                    label='<<'
                    variant={BUTTON_VARIANT.LINK}
                    className='ms-auto text-decoration-none'
                    onClick={handleErase}
                  />
                </div>
              </Col>
              <Col sm={5}>
                <span className={styled.copySegmentsText}><strong>Destination location/s segments</strong></span>
                <Card className='border-0'>
                  <Card.Body>
                    <DragDropContext onDragEnd={onDragEndReverse}>
                      <Droppable key='droppable-2' droppableId='drop-2'>
                        {provided => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            <ListGroup variant='flush'>
                              {segmentDataToCopy.map(seg => (
                                <ListGroup.Item
                                  className='shadow-none bg-light rounded'
                                  key={seg.followUpStatus}
                                >
                                  <strong>{parseTitle(seg.followUpStatus)}</strong>
                                  {seg.followUpSegments.map((segment, index) => (
                                    <div>
                                      <ListGroup.Item className={styled.groupItem}>
                                        <Draggable
                                          draggableId={`${segment.segmentId}`}
                                          index={index}
                                          key={segment.segmentId}
                                        >
                                          {provided => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className='m-1 h-5'
                                            >
                                              <p><strong> {segment.name} </strong></p>
                                              {segment.segmentAttributes.map(att => (
                                                <p>{att.attributeType}: { att.attributeValue}</p>
                                              ))}
                                            </div>
                                          )}
                                        </Draggable>
                                      </ListGroup.Item>
                                    </div>
                                  ))}
                                </ListGroup.Item>
                              ))}
                              {provided.placeholder}
                            </ListGroup>
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </div>
        <div className={styled.buttonCopySegments}>
          <Button
            disabled={!disableCopyButton || copyInProcess}
            label='Copy'
            variant={BUTTON_VARIANT.SOLID}
            className='ms-auto'
            onClick={handleSaveCopy}
          />
        </div>
      </Card.Body>
    </Card>
  )
}

export default CopySegments
