import {useEffect, useState} from "react";
import {LngLat} from "mapbox-gl";
import {format, parseISO} from 'date-fns'

export function useWaveHeight(lngLat?: LngLat) {
    const [waveHeight, setWaveHeight] = useState<number|null>(null)
    const [maxWaveTime, setMaxWaveTime] = useState<string|null>(null)

    useEffect(() => {
        const fetcher = async () => {
            if (!lngLat) {
                setWaveHeight(null)
                return
            }

            const params = new URLSearchParams()
            params.append('lng', String(lngLat.lng))
            params.append('lat', String(lngLat.lat))

            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_ROOT}/waves/max_height?${params}`)
            if (!response.ok) {
                return
            }

            const respObj = await response.json()
            if (typeof respObj.max_height === 'undefined') {
                setWaveHeight(null)
                setMaxWaveTime(null)
            } else {
                setWaveHeight(respObj.max_height)
                setMaxWaveTime(format(parseISO(respObj.max_height_time), 'dd.MM.yy HH:mm'))
            }
        }

        fetcher()
    }, [lngLat]);

    return { waveHeight, maxWaveTime }
}
