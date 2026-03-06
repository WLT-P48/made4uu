import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

/* desktop square animation */
const squareSlide = keyframes`
0% { stroke-dashoffset:0 }
100% { stroke-dashoffset:256 }
`;

/* desktop circle path */
const dotFollow = keyframes`
0% { cx:8; cy:40 }
12.5% { cx:8; cy:72 }
25% { cx:40; cy:72 }
37.5% { cx:72; cy:72 }
50% { cx:72; cy:40 }
62.5% { cx:72; cy:8 }
75% { cx:40; cy:8 }
87.5% { cx:8; cy:8 }
100% { cx:8; cy:40 }
`;

/* mobile rectangle path */
const dotFollowMobile = keyframes`
0% { cx:8; cy:50 }
12.5% { cx:8; cy:92 }
25% { cx:100; cy:92 }
37.5% { cx:192; cy:92 }
50% { cx:192; cy:50 }
62.5% { cx:192; cy:8 }
75% { cx:100; cy:8 }
87.5% { cx:8; cy:8 }
100% { cx:8; cy:50 }
`;

const Loader = () => {

const [isMobile,setIsMobile]=useState(false)

useEffect(()=>{
const checkScreen=()=>{
setIsMobile(window.innerWidth<=768)
}

checkScreen()
window.addEventListener("resize",checkScreen)

return()=>window.removeEventListener("resize",checkScreen)

},[])

const letters="Made4UU".split("")

return(

<Wrapper>

<div className="slider">

{/* MOBILE VIEW */}

{isMobile && (

<div className="loader mobile">

<svg viewBox="0 0 200 100">

<rect
className="square"
x="8"
y="8"
width="184"
height="84"
pathLength="256"
/>

<circle
className="dot mobileDot"
r="6"
cx="8"
cy="50"
/>

<text
x="100"
y="52"
textAnchor="middle"
dominantBaseline="middle"
className="letter mobileText"
>
Made4UU
</text>

</svg>

</div>

)}

{/* DESKTOP VIEW */}

{!isMobile && letters.map((letter,index)=>(
<div className="loader" key={index}>

<svg viewBox="0 0 80 80">

<rect
className="square"
x="8"
y="8"
width="64"
height="64"
pathLength="256"
/>

<circle
className="dot"
r="5"
cx="8"
cy="40"
/>

<text
x="40"
y="40"
textAnchor="middle"
dominantBaseline="middle"
className="letter"
>
{letter}
</text>

</svg>

</div>

))}

</div>

</Wrapper>

)

}

const Wrapper=styled.div`

position:fixed;
top:0;
left:0;
width:100%;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
z-index:9999;
background:#F8F8FF;

/* slider */

.slider{
display:flex;
gap:2vw;
}

/* desktop loader */

.loader{
width:6vw;
height:6vw;

min-width:60px;
min-height:60px;

max-width:80px;
max-height:80px;
}

.loader svg{
width:100%;
height:100%;
}

/* mobile loader */

.loader.mobile{
width:240px;
height:110px;
}

/* square */

.square{
fill:none;
stroke:#2f3545;
stroke-width:9;
stroke-linecap:round;

stroke-dasharray:192 64;

animation:${squareSlide} 4s linear infinite;
}

/* circle */

.dot{
fill:#FFCC33;
animation:${dotFollow} 4s linear infinite;
}

.mobileDot{
animation:${dotFollowMobile} 4s linear infinite;
}

/* letters */

.letter{
fill:black;
font-size:22px;
font-weight:bold;
font-family:sans-serif;
}

.mobileText{
font-size:34px;
}

`

export default Loader