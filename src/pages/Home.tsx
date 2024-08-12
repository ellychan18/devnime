import MainLayout from "../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { Header, Card } from "../components";
import { MainDataInterface } from "../interfaces";
import { online } from "../utils"; // Hapus getQuery jika tidak digunakan

const Home = () => {
   const [data, setData] = useState<MainDataInterface | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);

   const top = useRef<HTMLSpanElement>(null);
   const URL = `${import.meta.env.VITE_BASE_URL}/otakudesu/home`;

   useEffect(() => {
      (async () => {
         scrollTo({
            top: top.current?.offsetTop,
            left: 0,
            behavior: "smooth",
         });

         document.title = "Wajik Streaming | Home";
         online(setError); // Hapus setRefresh jika tidak digunakan
         setIsLoading(true);

         try {
            const response = await fetch(URL);
            const result = await response.json();

            setIsLoading(false);
            setData(result.data); // Akses data dari respons API
         } catch (err: any) {
            setIsLoading(false);
            setError(err);
         }
      })();
   }, []); // Hapus page dan refresh jika tidak diperlukan

   return (
      <MainLayout>
         <span ref={top}></span>
         <Header route="🏠 Home" message="terbaru" />
         <Card data={data} isLoading={isLoading} error={error} />
      </MainLayout>
   );
};

export default Home;
