import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const RoundButton = ({ icon, label, onClick, className, type="" }) => {
  const xTo = useRef();
  const yTo = useRef();
  const buttonRef = useRef(null);
  const divRef = useRef(null);

  const { contextSafe } = useGSAP (()=>{
    xTo.current = gsap.quickTo(divRef.current, "x", {duration:0.8, ease: "power3"});
    yTo.current = gsap.quickTo(divRef.current, "y", {duration:0.8, ease: "power3"});
    

    gsap.to(divRef.current, {
      scale: 0,
      xPercent: -50,
      yPercent: -50,
      zIndex: -10,
    })
  },{scope: buttonRef});


  const handleMouseEnter = contextSafe(() => {
    gsap.to(divRef.current, {
      scale:1,
      duration:0.3,
    });

  });
  const handleMouseLeave = contextSafe(() => {
    gsap.to(divRef.current, {
      scale:0,
      duration:0.3,
    })
  });
  const handleMouseMove = contextSafe((e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const { top, left } = rect;
    xTo.current(e.clientX - left);
    yTo.current(e.clientY - top);
  });

  return (
    <button
      ref={buttonRef}
      className={`relative flex justify-center items-center border-2 border-solid border-primary px-4 py-2 rounded-3xl bg-primary text-white 
                 overflow-hidden hover:text-primary hover:border-primary duration-200 hover:scale-105 ${className} z-0`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={(e)=>{handleMouseMove(e)}}
      onClick={onClick}
      type={type}
    >
      <div ref={divRef} className="absolute w-[200px] h-[150px] bg-white dark:bg-dark left-0 top-0 wrapperElement -z-10 pointer-events-none rounded-[50%]"></div>
      <span className="material-icons material-symbols-outlined mr-1">{icon}</span>
      <p className="z-10">{label}</p>
    </button>
  );
};

export default RoundButton