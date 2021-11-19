import { useEffect, useState } from 'react'

const DEFAULT_LOCATION = { lon: 48.865, lat: 2.275 }

export function useGeolocation() {

}

export function useLocation() {
  const [location, setLocation] = useState(DEFAULT_LOCATION)

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // since only one tab should be active and in the current window at once
      // the return variable should only have one entry
      const activeTab = tabs[0]
      const url = activeTab.url

      if (url !== undefined && isGoogleAddress(url)) {
        setLocation(getAdresseCoordinates(url))
      }
    })

    const onTabChange = (tabId, changeInfo) => {
      if (changeInfo.url !== undefined && isGoogleAddress(changeInfo.url)) {
        setLocation(getAdresseCoordinates(changeInfo.url))
      }
    }

    chrome.tabs.onUpdated.addListener(onTabChange)
    return () => chrome.tabs.onUpdated.removeListener(onTabChange)
  }, [])

  return location
}

function isGoogleAddress(url) {
  return url.startsWith("https://www.google.fr/maps/")
}

function getAdresseCoordinates(google_url) {
  var parsed_url = google_url.split("@")[1].split(",")
  var lat = parseFloat(parsed_url[0])
  var lon = parseFloat(parsed_url[1])
  return { lon, lat }
}
