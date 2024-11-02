'use client'

import React from 'react';
import { ListIcon } from "@/components/icons";
import Map from "@/components/map/map";
import { MapIcon } from "@/components/icons";
import Button from "@/components/button";
import Container from "@/components/container";
import { ChatIcon } from "@/components/icons";
import { MapPoint } from "@/types/map";
import MapPopup from "@/components/map/mapPopup";
import MapMarker from "@/components/map/mapMarker";
import Image from 'next/image';
import * as Icons from "@/components/icons";
import MapMenu from '@/components/mapMenu';

const IconComponents = Icons;

interface SduiProps {
  mapPoints: MapPoint[];
}

export default function Sdui({mapPoints}: SduiProps) {

    return(
        <main className="w-full h-screen">
            <Map mapPoints={mapPoints}>
                <MapMenu />
                { mapPoints.map((point: MapPoint) => {
                    const imageSrc = point.images[0] ? process.env.NEXT_PUBLIC_DB_ADDR + 'api/files/' + point.collectionId + '/' + point.id + '/' + point.images[0] : ''

                    return(
                        <MapMarker
                            key={point.id}
                            longitude={point.longitude}
                            latitude={point.latitude}
                        >
                            <Button variant="map_marker_clicked"
                                dataId={point.id}
                                className={`w-[40px] h-[28px] flex items-center justify-center shadow-[0px_0px_4px_1px_#00000060] rounded-full`}
                            >
                                {IconComponents[point.type as keyof typeof IconComponents] 
                                    ? React.createElement(IconComponents[point.type as keyof typeof IconComponents], {
                                        className: `h-[20px] w-[20px]}`
                                    })
                                    : <Icons.XIcon className={`h-[20px] w-[20px]`} />
                                }
                            </Button>
                            <MapPopup point={point}>
                                <Container className='w-[500px] h-[160px] p-2 flex flex-row'>
                                    <Container className='relative w-full h-full grid grid-cols-9 grid-rows-4 rounded-xl overflow-hidden bg-white shadow-[0px_0px_4px_1px_#00000050]'>
                                        <Image
                                            src={imageSrc ? imageSrc : '/file.svg'}
                                            width={1500}
                                            height={1500}
                                            alt={point.title}
                                            className="object-cover w-full h-full col-span-3 row-span-4 col-start-1 row-start-1"
                                        />
                                        <Button variant='map_popup_close' className='absolute top-2 left-2 flex items-center justify-center border-none rounded-full bg-[#00000040] w-[28px] h-[28px] focus:outline-none'>
                                            <IconComponents.XIcon className='w-[20px] h-[20px] invert' />
                                            </Button>
                                        <h2 className='col-span-6 row-span-2 p-1 text-lg font-bold line-clamp-2 flex items-center'>{point.title}</h2>
                                        <Container className='flex flex-row col-span-4 row-start-3 col-start-4 p-1 items-center'>
                                            <IconComponents.LocationIcon className='w-[20px] h-[20px]' />
                                            <h3 className='font-bold text-base w-full truncate'>{point.location}</h3>
                                        </Container>
                                        <Container className='flex flex-row col-span-4 row-span-4 col-start-4 p-1 items-center'>
                                            <IconComponents.CalendarIcon className='w-[20px] h-[20px]' />
                                            <h3 className='font-bold text-base w-full truncate'>{new Date(point.date).toDateString()}</h3>
                                        </Container>
                                        <Container className='col-span-2 row-span-2 row-start-3 p-1'>
                                            <Container className='flex flex-col items-center justify-evenly w-full h-full rounded-xl text-base bg-black text-white'>
                                                <Container className='flex flex-row items-center justify-center gap-1'>
                                                    <span className='font-bold text-base h-[20px]'>3/4</span>
                                                    <IconComponents.TwoPeopleIcon className='w-[20px] h-[20px] invert' />
                                                </Container>
                                                <h3 className='font-bold truncate w-fit'>1000€</h3>
                                            </Container>
                                        </Container>
                                    </Container>
                                </Container>
                            </MapPopup>
                        </MapMarker>
                )})}
            </Map>
            <Container className='absolute bottom-0 left-0 flex flex-col w-[100vw] h-[100vh] justify-end items-center pointer-events-none'>
                <Container className="flex justify-evenly w-[400px] shadow-[0px_0px_4px_1px_#00000020] p-2 gap-1 h-fit rounded-t-[12px] bg-white pointer-events-auto">
                    <Button>
                        <ListIcon className="w-[40px] h-[40px]"/>
                    </Button>
                    <Button>
                        <MapIcon className="w-[40px] h-[40px]"/>
                    </Button>
                    <Button>
                        <ChatIcon className="w-[40px] h-[40px]"/>
                    </Button>
                </Container>
            </Container>
        </main>
    )
}