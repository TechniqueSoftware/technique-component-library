import React, { useContext, useState, useEffect } from 'react'
import { DEVICES } from '@global/constants'

const DeviceContext = React.createContext(DEVICES.DESKTOP)
const WindowWidthContext = React.createContext(null)

// eslint-disable-next-line react/prop-types
export const DeviceProvider = ({ children }) => {
  const [device, setDevice] = useState(DEVICES.TABLET)
  const [windowWidth, setWindowWidth] = useState(null)
  const check = [DEVICES.TABLET, DEVICES.DESKTOP]

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setWindowWidth(width)

      for (let i = check.length - 1; i >= 0; i--) {
        if (width >= check[i]) {
          setDevice(check[i])
          break
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <WindowWidthContext.Provider value={windowWidth}>
      <DeviceContext.Provider value={device}>
        {children}
      </DeviceContext.Provider>
    </WindowWidthContext.Provider>
  )
}

export const useDevice = () => useContext(DeviceContext)
export const useWindowWidth = () => useContext(WindowWidthContext)
