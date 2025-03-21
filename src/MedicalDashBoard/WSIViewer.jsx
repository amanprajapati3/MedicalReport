import React, { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./WEIViewer.css";

const WSIViewer = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentTime, setCurrentTime] = useState("");
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0, scale: 1 });
  const [detectionResults, setDetectionResults] = useState([]);

  useEffect(() => {
    const formatDate = (date) => {
      return date.toDateString() + " " + date.toTimeString().split(" ")[0];
    };

    setCurrentTime(formatDate(new Date()));
    const interval = setInterval(() => {
      setCurrentTime(formatDate(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    fetch("/Data/output.json")
      .then((response) => response.json())
      .then((data) => {
        try {
          // Fix potential formatting issues in the JSON string
          let jsonString = data.inference_results
            .replace(/'/g, '"') // Convert single quotes to double quotes
            .replace(/None/g, "null") // Fix Python-style None
            .replace(/True/g, "true") // Convert True to true
            .replace(/False/g, "false"); // Convert False to false
  
          // Parse JSON safely
          const inferenceResults = JSON.parse(jsonString);
  
          // Extract bounding box data
          const processedResults = inferenceResults.output.detection_results.map((box) => ({
            x: box[0],
            y: box[1],
            width: box[2] - box[0],
            height: box[3] - box[1],
            label: box[4]
          }));
  
          setDetectionResults(processedResults);
        } catch (error) {
          console.error("Error parsing JSON:", error, "Raw JSON:", data.inference_results);
        }
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);
   

  const handleZoomIn = (zoomIn) => {
    zoomIn();
    setZoomLevel((prev) => prev + 0.2);
  };  

  const handleZoomOut = (zoomOut) => {
    zoomOut();
    setZoomLevel((prev) => Math.max(1, prev - 0.2));
  };

  return (
    <>
     <div className=" mt-12 text-[15px] md:mx-5 lg:mx-20 mb-10 flex p-3 justify-center border-[3px] border-black rounded-[80px] ">
        <div>
        <div className="border-b-2  border-black text-[17px] flex justify-center">
          {currentTime}
        </div>
        <button className="text-2xl mt-2 px-4 py-2 ml-8 border-2 border-black hover:cursor-pointer hover:text-white hover:bg-black transition-all duration-400 active:text-black active:bg-white">
          <FaArrowLeftLong />
        </button>
        <div className="grid gap-2 grid-cols-4 pl-4">
          {/* Left Panel */}
          <div>
            <div
              className="col-span-1 text-center rounded-xl shadow-md shadow-gray h-[210px] overflow-y-scroll"
              id="slider"
            >
              <table className="w-full text-sm mt-2 border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-green-300">
                    <th className="border p-2">RBC</th>
                    <th className="border">Count</th>
                    <th className="border p-2">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Angled Cells</td>
                    <td className="border ">222</td>
                    <td className="border ">67%</td>
                  </tr>
                  <tr>
                    <td className="border p-1">Borderline Ovalacytes</td>
                    <td className="border ">50</td>
                    <td className="border ">20%</td>
                  </tr>
                  <tr>
                    <td className="border p-1">Burr Cells</td>
                    <td className="border ">87</td>
                    <td className="border ">34%</td>
                  </tr>
                  <tr>
                    <td className="border p-1">Fragmented Cells</td>
                    <td className="border ">2</td>
                    <td className="border p-2">0.12%</td>
                  </tr>
                  <tr>
                    <td className="border p-1">Ovalacytes</td>
                    <td className="border "></td>
                    <td className="border p-2"></td>
                  </tr>
                  <tr>
                    <td className="border p-1">Rounded RBC</td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                  </tr>
                  <tr>
                    <td className="border p-1">Teardrops</td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="col-span-1 text-center rounded-xl shadow-md shadow-gray h-[210px] overflow-y-scroll"
              id="slider"
            >
              <table className="w-full mt-2 border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-green-300">
                    <th className="border p-2">WBC</th>
                    <th className="border">Count</th>
                    <th className="border p-2">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-1">Basophil</td>
                    <td className="border p-1">222</td>
                    <td className="border p-1">67%</td>
                  </tr>
                  <tr>
                    <td className="border p-1">Eosinophil</td>
                    <td className="border p-1">50</td>
                    <td className="border p-1">20%</td>
                  </tr>
                  <tr>
                    <td className="border p-1">Lymphocyte</td>
                    <td className="border p-1">87</td>
                    <td className="border p-1">34%</td>
                  </tr>
                  <tr>
                    <td className="border p-1">Monocyte</td>
                    <td className="border p-1">2</td>
                    <td className="border p-1">2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="col-span-1 text-center shadow-md shadow-gray overflow-y-scroll -mt-5"
              id="slider"
            >
              <h1 className="text-center bg-green-300  font-bold">
                Platelet
              </h1>
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border p-1">Basophil</td>
                    <td className="border p-1">222</td>
                  </tr>
                  <tr>
                    <td className="border p-1">Eosinophil</td>
                    <td className="border p-1">50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Center Image Viewer */}
          <div className="col-span-2 m flex flex-col items-center justify-center rounded-xl shadow-md">
            <TransformWrapper
              onZoom={(ref) => {
                setZoomPosition({
                  x: ref.state.positionX,
                  y: ref.state.positionY,
                  scale: ref.state.scale,
                });
              }}
            >
              {({ zoomIn, zoomOut }) => (
                <>
                  <TransformComponent>
                  <div className="relative">
                      <img
                        src="/image1.png"
                        alt="WSI"
                        className="w-full h-auto rounded-lg shadow"
                      />
                      {detectionResults.map((box, index) => (
                        <div
                          key={index}
                          className="absolute border-2 border-red-500"
                          style={{
                            left: `${box.x}px`,
                            top: `${box.y}px`,
                            width: `${box.width}px`,
                            height: `${box.height}px`,
                          }}
                        ></div>
                      ))}
                    </div>
                  </TransformComponent>
                  <div className="flex  gap-2 m-4 font-semibold">
                    <button
                      className="px-4 py-2 bg-green-500 border-2 hover:bg-green-900 active:scale-105 hover:cursor-pointer border-green-700 text-white rounded-md "
                      onClick={() => handleZoomIn(zoomIn)}
                    >
                      Zoom In
                    </button>
                    <button
                      className="px-4 py-2 bg-fuchsia-600 border-2 hover:bg-fuchsia-800 active:scale-105 hover:cursor-pointer border-fuchsia-800 text-white rounded-md "
                      onClick={() => handleZoomOut(zoomOut)}
                    >
                      Zoom Out
                    </button>
                  </div>
                </>
              )}
            </TransformWrapper>
          </div>

          {/* Right Panel - Zoomed View Info */}
          <div>
            <div className="col-span-1 text-center border-2 border-black  rounded-sm p-10 shadow-md">
              <div className="relative w-full h-40 flex justify-center items-center">
                <img
                  src="/image1.png"
                  alt="Zoomed Out Preview"
                  className="w-40 h-40 object-cover rounded-md border"
                />
                <div
                  className="absolute border-2 border-red-500"
                  style={{
                    width: `${20 / zoomPosition.scale}px`,
                    height: `${20 / zoomPosition.scale}px`,
                    left: `${60 - zoomPosition.x / zoomPosition.scale}px`,
                    top: `${5 - zoomPosition.y / zoomPosition.scale}px`,
                  }}
                ></div>
              </div>
              <span className="flex justify-center gap-5 mt-1 px-12 border-t-2 py-1">
                <h1 className="text-center">Patient ID</h1>
                <h1 className="text-center">Blood</h1>
              </span>
              {/* <p>Zoom Level: {zoomLevel.toFixed(1)}x</p> */}
            </div>
            <div className="mt-28">
              <center>
                <button className="px-8 py-1 text-white bg-gray-700 text-2xl active:scale-110 hover:bg-black rounded-md transition-all duration-100 cursor-pointer">
                  Report
                </button>
              </center>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default WSIViewer;
