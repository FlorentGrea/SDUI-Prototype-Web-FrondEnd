//import PocketBase from 'pocketbase';
//import { MapPoint } from "@/types/map";
//import Sdui from "./sdui";
import SduiCall from '@/components/SduiCall/sduiCall';

export default async function Home() {
  //const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_ADDR);
  //const mapPoints = await pb.collection('MapPoints').getFullList({ next: { tags: ['mapPoints'] } })

  return (
    <SduiCall macroComponentName="MainPage" />
  )
/*
  return (
    <main className="w-full h-screen">
      <Sdui mapPoints={mapPoints as unknown as MapPoint[]} />
    </main>
  );*/
}