import Button from "@/components/button";
import Container from "@/components/container";
import { ListIcon, MapIcon, ChatIcon } from "@/components/icons";
import Map from "@/components/map";
import PocketBase from 'pocketbase';

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

export default async function Home() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_ADDR);
  const mapPoints = await pb.collection('MapPoints').getFullList({ next: { tags: ['mapPoints'] } })

  return (
    <main className="w-full h-screen">
      <Map mapPoints={mapPoints as unknown as MapPoint[]} />
      <Container className="flex justify-evenly w-[400px] shadow-[0px_0px_4px_1px_#00000020] p-2 gap-1 h-fit rounded-t-[12px] bg-white absolute bottom-0 left-0 right-0 m-auto">
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
    </main>
  );
}
