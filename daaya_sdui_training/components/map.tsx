'use client'

import * as Icons from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ReactMapGl, { Marker, Popup, ViewStateChangeEvent } from 'react-map-gl';
import Button from './button';
import React from 'react';

interface MapPoint {
    id: number;
    longitude: number;
    latitude: number;
    type: string;
    images: string[];
    collectionId: string;
    title: string;
    location: string;
    date: string;
}

const IconComponents = Icons;

export default function Map({ mapPoints }: { mapPoints: MapPoint[] }) {
    const [selectedLocation, setSelectedLocation] = useState(0)
    const [viewState, setViewState] = useState({
        latitude: 46.2276,
        longitude: 2.2137,
        zoom: 4
    })

    return (
        <ReactMapGl
            mapStyle={'mapbox://styles/canardwc/clyyn8d2q00cl01r23wk58eqb'}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
            style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}
            {...viewState}
            onMove={(event: ViewStateChangeEvent) => setViewState(event.viewState)}
        >
            { mapPoints.map((point: MapPoint) => {
                const imageSrc = point.images[0] ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + point.collectionId + '/' + point.id + '/' + point.images[0] : ''

                return(
                    <div key={point.id}>
                        <Marker
                            longitude={point.longitude}
                            latitude={point.latitude}
                        >
                            <Button onClick={() => setSelectedLocation(point.id)} className={`w-[40px] h-[28px] flex items-center justify-center shadow-[0px_0px_4px_1px_#00000050] ${selectedLocation === point.id && 'bg-black'}`}>
                                {IconComponents[point.type as keyof typeof IconComponents] 
                                    ? React.createElement(IconComponents[point.type as keyof typeof IconComponents], {
                                        className: `h-[20px] w-[20px] ${selectedLocation === point.id && 'filter-white'}`
                                    })
                                    : <Icons.XIcon className={`h-[20px] w-[20px] ${selectedLocation === point.id && 'filter-white'}`} />
                                }
                            </Button>
                        </Marker>
                        { (selectedLocation === point.id) && (
                            <Popup
                                closeButton={false}
                                closeOnClick={false}
                                closeOnMove={true}
                                offset={20}
                                onClose={() => setSelectedLocation(0)}
                                longitude={point.longitude}
                                latitude={point.latitude}
                            >
                                <Link 
                                    href={`/cards/${point.id}`} 
                                    className='flex md:flex-col md:h-52 h-24 w-64 bg-white md:border-none border rounded-lg overflow-hidden'
                                >
                                    <div className='h-full md:h-[60%] w-[40%] md:w-full'>
                                        { imageSrc ?
                                            <Image
                                                src={imageSrc}
                                                width={1500}
                                                height={1500}
                                                alt={point.title}
                                                className="object-cover w-full h-full"
                                            />
                                        :
                                            <div className='bg-red-300' />
                                        }
                                    </div>
                                    <div className='flex flex-col p-2 md:pt-1 w-[60%] md:w-full'>
                                        <h3 className='w-36 md:w-full truncate font-bold text-lg text-macaroni-and-cheese-950'>{point.title}</h3>
                                        <h4 className='w-36 md:w-full truncate test-sm text-macaroni-and-cheese-600'>{point.location}</h4>
                                        <h5 className='w-36 md:w-full truncate text-xs text-macaroni-and-cheese-950'>{new Date(point.date).toDateString()}</h5>
                                    </div>
                                </Link>
                                <button 
                                    className='absolute md:top-2 md:right-2 bottom-[68%] left-2 md:left-auto bg-black/40 rounded-full focus:border-none' 
                                    onClick={() => setSelectedLocation(0)}
                                >
                                    <Icons.XIcon className='filter-mc-50' />
                                </button>
                            </Popup>
                        )}
                    </div>
            )})}
        </ReactMapGl>
)}