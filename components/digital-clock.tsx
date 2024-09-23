"use client"

//import necessary hooks from react
import { useState, useEffect, useMemo } from "react";

//import custom ui components from the UI directory

import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

//default export of the digitalclock components function

export default function digitalClock(){
    // State hooks for managing current time
    const [time, setTime] =useState<Date>(new Date());
    const [is24Hours, setIs24Hours] = useState<boolean>(true);
    const [mounted, setMounted] = useState<boolean>(false);

    //Effect hook to run on component mount

    useEffect(()=>{
        setMounted(true);
        const interval = setInterval(() => {
            setTime(new Date()); // update the time every second
            
        },1000);
        return ()=> clearInterval(interval)
    },[]);

    //Memoized computation of formatted time to avoid unnecessary recalculations
    const formattedTime = useMemo<string>(()=>{
        if (!mounted) return ""; //don't render time on server
        const hours = is24Hours
        ? time.getHours().toString().padStart(2,"0") //format hours in 24-hour format
        : (time.getHours()%12||12).toString().padStart(2,"0"); //format hours in 12-hour format
        const minutes = time.getMinutes().toString().padStart(2,"0"); // format minutes 
        const seconds = time.getSeconds().toString().padStart(2,"0"); // format seconds
        return `${hours}:${minutes}:${seconds}` 
    },[time,is24Hours,mounted]); //dependencies to rerun the memoized function

      // JSX return statement rendering the digital clock UI
  return (
    <div className="flex items-center justify-center h-screen">
      {/* Center the digital clock within the screen */}
      <Card className="p-8 shadow-lg rounded-2xl bg-orange-100">
        <div className="flex flex-col items-center justify-center">
          {/* Header with title */}
          <div className="text-2xl font-bold tracking-tight text-purple-700">Digital Clock</div>
          {/* Description */}
          <div className="text-sm text-purple-700 dark:text-pink-300 mb-4">
            Display current time in hours, minutes, and seconds.
          </div>
          {/* Display the formatted time */}
          <div className="text-6xl font-bold tracking-tight text-purple-700">
            {formattedTime}
          </div>
          {/* Buttons to switch between 24-hour and 12-hour formats */}
          <div className="mt-4 flex items-center text-purple-700">
            <Button
              variant={is24Hours ? "default" : "outline"}
              onClick={() => setIs24Hours(true)}
              className="mr-2 font-bold bg-pink-300  hover:bg-purple-700 hover:text-pink-300"
            >
              24-Hour Format
            </Button>
            <Button
              variant={!is24Hours ? "default" : "outline"}
              onClick={() => setIs24Hours(false)}
              className="mr-2 font-bold bg-pink-300 hover:bg-purple-700 hover:text-pink-300"
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );


} 