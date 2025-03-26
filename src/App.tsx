import {useEffect, useRef, useState} from 'react'
import mapboxgl from 'mapbox-gl'


import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'
import {useWaveHeight} from "../hooks/useWaveHeight.ts";

function App() {
    const mapRef = useRef<null|mapboxgl.Map>(null)
    const mapContainerRef = useRef<null|HTMLDivElement>(null)
    const markerRef = useRef<null|mapboxgl.Marker>(null)

    const [selPoint, setSelPoint] = useState<mapboxgl.LngLat>()
    const { waveHeight, maxWaveTime } = useWaveHeight(selPoint)

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current!,
            center: [10.5483, 59.0747],
            zoom: 6
        });

        markerRef.current = new mapboxgl.Marker({
            color: '#512345',
            draggable: false
        })

        mapRef.current.on('click', async (e) => {
            setSelPoint(e.lngLat)
            markerRef.current?.setLngLat(e.lngLat).addTo(mapRef.current!)
        })

        return () => {
            markerRef.current?.remove()
            mapRef.current?.remove()
        }
    }, [])


  return (
    <>
      <div id='map-container' ref={mapContainerRef}></div>
        <div className="sidebar">
            { !selPoint ? (
                <span>Click the map to view wave info at that point.</span>
            ) : (
                <span>
                    Longitude: {selPoint.lng.toFixed(4)} |
                    Latitude: {selPoint.lat.toFixed(4)} |
                    Max. Wave Height: {waveHeight === null ? (
                    <span>No data</span>
                ) : (
                    <span>{waveHeight?.toFixed(4)}m at {maxWaveTime}</span>
                )}
                </span>
            )}

        </div>
    </>
  )
}

export default App
