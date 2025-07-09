"use client";

import { useEffect } from "react";
import Cursor from "mouse-follower";
import gsap from "gsap";
import "mouse-follower/dist/mouse-follower.min.css";

// مهم: لازم تربط GSAP بالمكتبة
Cursor.registerGSAP(gsap);

export default function MouseFollowerDemo() {
 useEffect(() => {
  Cursor.registerGSAP(gsap);

  const timeout = setTimeout(() => {
    const cursor = new Cursor({
      container: document.body,
      speed: 0.5,
      ease: "expo.out",
    });
  }, 300); // وقت كافي لظهور العناصر

  return () => clearTimeout(timeout);
}, []);


  return (
    <div className="p-10">
  <div id="stick-target" data-cursor-stick="#stick-target">
  <h1 data-cursor-text="👋">Hover me to see magic</h1>
</div>

    </div>
  );
}
