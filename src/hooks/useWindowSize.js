import { useEffect, useState } from "react"

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    // the state is undefined at this point. It will get the width and height of the browser.
      width: undefined, 
      height: undefined
  })

  useEffect(() => {

    const handleResize = () => {
        setWindowSize({
          // track the size of the windowSize
            width: window.innerWidth,
            height: window.innerHeight
        });
    }
    // setting up the window size once at initial load time.
    handleResize()

    // to get the value to continue to adust when the window is resized.
    // in case size changes after the load, it listens for the resize event, and call handleResize to action, adjusting the window size again.
    window.addEventListener("resize", handleResize);

    // adding cleanup function to remove the event listener and prevent memory leak in the app.
    const cleanUp = () => {
      // console.log("runs if dependency changes.")
      window.removeEventListener("resize", handleResize);
    }
    return cleanUp;
  }, [])
  return windowSize;
}

export default useWindowSize