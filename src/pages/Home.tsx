import MainLayout from "../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { Header, Card } from "../components";
import { MainDataInterface } from "../interfaces";
import { getQuery, online } from "../utils";

const Home = () => {
   const [data, setData] = useState<{ onGoing: MainDataInterface[] } | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [refresh, setRefresh] = useState<number>(0);

   const top = useRef<HTMLSpanElement>(null);
   const page = getQuery("page");
   const URL = `${import.meta.env.VITE_BASE_URL}/otakudesu/home?page=${page || 1}`;

   useEffect(() => {
      (async () => {
         scrollTo({
            top: top.current?.offsetTop,
            left: 0,
            behavior: "smooth",
         });

         document.title = "Wajik Streaming | Home";
         online(setRefresh, setError);
         setIsLoading(true);

         try {
            const response = await fetch(URL);
            const result = await response.json();

            setIsLoading(false);
            setData(result.data); // Menetapkan data yang diakses dari result.data
         } catch (err: any) {
            setIsLoading(false);
            setError(err);
         }
      })();
   }, [page, refresh]);

   // Menyaring data untuk diteruskan ke Card jika data ada
   const ongoingData = data?.onGoing || null;

   return (
      <MainLayout>
         <span ref={top}></span>
         <Header route="🏠 Home" message="terbaru" />
         <Card data={ongoingData} isLoading={isLoading} error={error} />
      </MainLayout>
   );
};

export default Home;
