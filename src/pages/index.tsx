import HoursList from "@/components/index/HoursList";
import MonthCalendar from "@/components/index/MonthCalendar";
import Percentages from "@/components/index/Percentages";
import TopButton from "@/components/index/TopButton";
import DateProvider from "@/context/DateContext/DateContext";
import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

type LeftTab = "hours" | "notes";
type TopTab = "hours" | "percentages";

const Index: NextPage = () => {
  const [activeLeftTab, setActiveLeftTab] = useState<LeftTab>("hours");
  const [activeTopTab, setActiveTopTab] = useState<TopTab>("hours");
  return (
    <>
      <Head>
        <title>Projektówki - godziny</title>
        <meta name="description" content="Projektówki - godziny" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        key="index"
        className="flex h-full flex-1 bg-gray-200"
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <DateProvider>
          <div className="h-full w-96 max-h-full relative flex flex-col border-r-2 border-r-gray-100">
            <div className="h-14 w-full border-b-2 border-gray-100 flex gap-10 px-10 text-xs text-white/60">
              <TopButton
                onClick={() => setActiveLeftTab("hours")}
                active={activeLeftTab === "hours"}
              >
                Kalendarz
              </TopButton>
              <TopButton
                active={activeLeftTab === "notes"}
                onClick={() => setActiveLeftTab("notes")}
              >
                Zgłoszenia
              </TopButton>
            </div>
            <div className="w-full h-full flex-1">
              <AnimatePresence initial={false} mode="wait">
                {activeLeftTab === "hours" && (
                  <motion.div
                    key="calendar"
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <MonthCalendar />
                  </motion.div>
                )}
                {activeLeftTab === "notes" && (
                  <motion.div
                    key="calendar2"
                    className="w-full h-full "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    exit={{ opacity: 0 }}
                  ></motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex-1 flex flex-col max-h-full relative">
            <div className="w-full h-14  border-b-2 border-b-gray-100 px-10 flex gap-10">
              <TopButton
                className="text-sm"
                active={activeTopTab === "hours"}
                onClick={() => setActiveTopTab("hours")}
              >
                Godziny
              </TopButton>
              <TopButton
                className="text-sm"
                active={activeTopTab === "percentages"}
                onClick={() => setActiveTopTab("percentages")}
              >
                Procenty
              </TopButton>
            </div>
            <div className="flex-auto h-0 flex overflow-auto bg-gray-100">
              <AnimatePresence initial={false} mode="wait">
                {activeTopTab === "hours" && <HoursList />}
                {activeTopTab === "percentages" && <Percentages />}
              </AnimatePresence>
            </div>
          </div>
        </DateProvider>
      </motion.div>
    </>
  );
};

export default Index;
