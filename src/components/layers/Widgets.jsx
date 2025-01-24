// import React, { useEffect, useRef, useState } from 'react';
// import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
// import Expand from '@arcgis/core/widgets/Expand';
// import Legend from '@arcgis/core/widgets/Legend';
// import Search from '@arcgis/core/widgets/Search';
// import Home from '@arcgis/core/widgets/Home';
// import Fullscreen from '@arcgis/core/widgets/Fullscreen';
// import Print from '@arcgis/core/widgets/Print';
// import Bookmarks from '@arcgis/core/widgets/Bookmarks';
// import Locate from '@arcgis/core/widgets/Locate';
// import Measurement from '@arcgis/core/widgets/Measurement';
// import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion';

// const Widgets = ({ view }) => {
//   const widgetsRef = useRef([]);
//   const distanceRef = useRef(null);  // ref for distance button
//   const areaRef = useRef(null);      // ref for area button
//   const clearRef = useRef(null);     // ref for clear button
//   const radiusRef = useRef(null);    // ref for radius button
//   const selectRef = useRef(null);    // ref for select button
//   const polygonGraphicsLayer = useRef(null); // ref for polygon layer
//   const markerLayer = useRef(null); // ref for marker layer
//   const sketchViewModelRef = useRef(null); // ref for SketchViewModel
//   const radiusDropdownRef = useRef(null); // ref for the radius dropdown
//   const toolbarDivRef = useRef(null);  // ref for the toolbar container
//   const [selectedRadius, setSelectedRadius] = useState(0);  // state for radius selection

//   useEffect(() => {
//     if (view) {
//       // Add Search widget
//       const searchWidget = new Search({ view });
//       view.ui.add(searchWidget, 'top-right');
//       widgetsRef.current.push(searchWidget);

//       // Add BasemapGallery widget
//       const basemapGallery = new Expand({
//         content: new BasemapGallery({ view }),
//         view,
//         expanded: false,
//       });
//       view.ui.add(basemapGallery, 'top-right');
//       widgetsRef.current.push(basemapGallery);

//       // Add Legend widget
//       const legend = new Expand({
//         content: new Legend({ view }),
//         view,
//         expanded: false,
//       });
//       view.ui.add(legend, 'bottom-left');
//       widgetsRef.current.push(legend);

//       // Add Home widget
//       const homeWidget = new Home({ view });
//       view.ui.add(homeWidget, 'top-left');
//       widgetsRef.current.push(homeWidget);

//       // Add Fullscreen widget
//       const fullscreenWidget = new Fullscreen({ view });
//       view.ui.add(fullscreenWidget, 'top-right');
//       widgetsRef.current.push(fullscreenWidget);

//       // Add Bookmarks widget
//       const bookmarks = new Expand({
//         content: new Bookmarks({ view }),
//         view,
//         expanded: false,
//       });
//       view.ui.add(bookmarks, 'top-right');
//       widgetsRef.current.push(bookmarks);

//       // Add Locate widget
//       const locateWidget = new Locate({ view });
//       view.ui.add(locateWidget, 'top-left');
//       widgetsRef.current.push(locateWidget);

//       // Add Coordinate Conversion widget
//       const coordinateConversion = new CoordinateConversion({ view });
//       view.ui.add(coordinateConversion, 'bottom-right');
//       widgetsRef.current.push(coordinateConversion);

//       // Add Print widget inside Expand widget
//       const printWidget = new Print({
//         view: view,
//         printServiceUrl:
//           "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
//       });

//       const printExpand = new Expand({
//         content: printWidget,
//         view: view,
//         expanded: false,
//         expandIconClass: "esri-icon-printer",
//         expandTooltip: "Print Map",
//       });

//       view.ui.add(printExpand, "top-right");
//       widgetsRef.current.push(printExpand);

//       // Measurement widget
//       const measurement = new Measurement({ view });
//       view.ui.add(measurement, "bottom-right");

//       // Toolbar functionality
//       if (distanceRef.current) {
//         distanceRef.current.onclick = function () {
//           measurement.activeTool = "distance";
//         };
//       }

//       if (areaRef.current) {
//         areaRef.current.onclick = function () {
//           measurement.activeTool = "area";
//         };
//       }

//       if (clearRef.current) {
//         clearRef.current.onclick = function () {
//           measurement.clear();
//           polygonGraphicsLayer.current?.removeAll();
//           view.graphics.removeAll();
//           markerLayer.current?.removeAll();
//         };
//       }

//       if (radiusRef.current) {
//         radiusRef.current.onclick = function () {
//           radiusDropdownRef.current.classList.toggle('hidden'); // Show/hide the dropdown
//         };
//       }

//       if (selectRef.current) {
//         selectRef.current.onclick = () => {
//           view.graphics.removeAll(); // Clear previous graphics
//           sketchViewModelRef.current?.create('rectangle');
//         };
//       }
//     }

//     // Cleanup on component unmount
//     return () => {
//       widgetsRef.current.forEach((widget) => {
//         view.ui.remove(widget);
//         widget.destroy();
//       });
//       widgetsRef.current = [];
//     };
//   }, [view]);

//   return (
//     <div>
//       <div ref={toolbarDivRef} id="toolbarDiv" className="esri-component esri-widget absolute top-44 left-[14px] z-10">
//         <button ref={distanceRef} className="esri-widget--button esri-interactive esri-icon-measure-line" title="Distance Measurement Tool"></button>
//         <button ref={areaRef} className="esri-widget--button esri-interactive esri-icon-measure-area" title="Area Measurement Tool"></button>
//         <button ref={radiusRef} className="esri-widget--button esri-interactive esri-icon-dial" title="Radius Measurement Tool"></button>
//         <button ref={selectRef} className="esri-widget--button esri-interactive esri-icon-checkbox-unchecked" title="Select by Rectangle"></button>
//         <div ref={radiusDropdownRef} className="esri-widget esri-interactive absolute top-8 left-[60px] z-10 bg-white shadow-md p-2 rounded hidden">
//           <label htmlFor="radius-select">Choose Radius:</label>
//           <select id="radius-select" onChange={(e) => setSelectedRadius(Number(e.target.value))} value={selectedRadius}>
//             <option value={0}>Choose km</option>
//             <option value={50}>50 km</option>
//             <option value={100}>100 km</option>
//             <option value={200}>200 km</option>
//             <option value={500}>500 km</option>
//             <option value={1000}>1000 km</option>
//           </select>
//         </div>
//         <button ref={clearRef} className="esri-widget--button esri-interactive esri-icon-trash" title="Clear Measurements"></button>
//       </div>
//     </div>
//   );
// };

// export default Widgets;
import React, { useEffect, useRef, useState } from "react";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import Legend from "@arcgis/core/widgets/Legend";
import Search from "@arcgis/core/widgets/Search";
import Home from "@arcgis/core/widgets/Home";
import Fullscreen from "@arcgis/core/widgets/Fullscreen";
import Print from "@arcgis/core/widgets/Print";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Locate from "@arcgis/core/widgets/Locate";
import Measurement from "@arcgis/core/widgets/Measurement";
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel"; // For selection tool

const Widgets = ({ view }) => {
  const widgetsRef = useRef({
    fullscreen: false,
    search: false,
    basemapGallery: false,
    legend: false,
    home: false,
    bookmarks: false,
    locate: false,
    coordinateConversion: false,
    print: false,
    measurement: false,
    sketchViewModel: false,
  });
  const distanceRef = useRef(null); // ref for distance button
  const areaRef = useRef(null); // ref for area button
  const clearRef = useRef(null); // ref for clear button
  const radiusRef = useRef(null); // ref for radius button
  const selectRef = useRef(null); // ref for select button
  const polygonGraphicsLayer = useRef(null); // ref for polygon layer
  const markerLayer = useRef(null); // ref for marker layer
  const sketchViewModelRef = useRef(null); // ref for SketchViewModel
  const radiusDropdownRef = useRef(null); // ref for the radius dropdown
  const toolbarDivRef = useRef(null); // ref for the toolbar container
  const [selectedRadius, setSelectedRadius] = useState(0); // state for radius selection

  useEffect(() => {
    if (!view) return; // Ensure view is passed

    // Wait until the view is fully initialized
    view.when(() => {
      if (view.ui) {
        // Add widgets if they haven't been added yet
        if (!widgetsRef.current.search) {
          const searchWidget = new Search({ view });
          view.ui.add(searchWidget, 'top-right');
          widgetsRef.current.search = searchWidget;
        }

        if (!widgetsRef.current.basemapGallery) {
          const basemapGallery = new Expand({
            content: new BasemapGallery({ view }),
            view,
            expanded: false,
          });
          view.ui.add(basemapGallery, 'top-right');
          widgetsRef.current.basemapGallery = basemapGallery;
        }

        if (!widgetsRef.current.legend) {
          const legend = new Expand({
            content: new Legend({ view }),
            view,
            expanded: false,
          });
          view.ui.add(legend, 'bottom-left');
          widgetsRef.current.legend = legend;
        }

        if (!widgetsRef.current.home) {
          const homeWidget = new Home({ view });
          view.ui.add(homeWidget, 'top-left');
          widgetsRef.current.home = homeWidget;
        }

        if (!widgetsRef.current.fullscreen) {
          const fullscreenWidget = new Fullscreen({ view });
          view.ui.add(fullscreenWidget, 'top-right');
          widgetsRef.current.fullscreen = fullscreenWidget;
        }

        if (!widgetsRef.current.bookmarks) {
          const bookmarks = new Expand({
            content: new Bookmarks({ view }),
            view,
            expanded: false,
          });
          view.ui.add(bookmarks, 'top-right');
          widgetsRef.current.bookmarks = bookmarks;
        }

        if (!widgetsRef.current.locate) {
          const locateWidget = new Locate({ view });
          view.ui.add(locateWidget, 'top-left');
          widgetsRef.current.locate = locateWidget;
        }

        if (!widgetsRef.current.coordinateConversion) {
          const coordinateConversion = new CoordinateConversion({ view });
          view.ui.add(coordinateConversion, 'bottom-right');
          widgetsRef.current.coordinateConversion = coordinateConversion;
        }

        if (!widgetsRef.current.print) {
          const printWidget = new Print({
            view: view,
            printServiceUrl:
              "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
          });
          const printExpand = new Expand({
            content: printWidget,
            view: view,
            expanded: false,
            expandIconClass: "esri-icon-printer",
            expandTooltip: "Print Map",
          });
          view.ui.add(printExpand, "top-right");
          widgetsRef.current.print = printExpand;
        }

        if (!widgetsRef.current.measurement) {
          const measurement = new Measurement({ view });
          view.ui.add(measurement, "bottom-right");
          widgetsRef.current.measurement = measurement;
        }

        // Create SketchViewModel for selecting geometry
        if (!widgetsRef.current.sketchViewModel) {
          sketchViewModelRef.current = new SketchViewModel({
            view,
            layer: new GraphicsLayer(),
            polygonSymbol: { type: "simple-fill", color: [255, 0, 0, 0.3], outline: { color: "red", width: 2 } },
          });

          sketchViewModelRef.current.on("create", (event) => {
            if (event.state === "complete") {
              // Add selected geometry to the map
              view.graphics.add(event.graphic);
            }
          });

          widgetsRef.current.sketchViewModel = sketchViewModelRef.current;
        }

        // Toolbar functionality
        if (distanceRef.current) {
          distanceRef.current.onclick = function () {
            widgetsRef.current.measurement.activeTool = "distance";
          };
        }

        if (areaRef.current) {
          areaRef.current.onclick = function () {
            widgetsRef.current.measurement.activeTool = "area";
          };
        }

        if (clearRef.current) {
          clearRef.current.onclick = function () {
            widgetsRef.current.measurement.clear();
            polygonGraphicsLayer.current?.removeAll();
            view.graphics.removeAll();
            markerLayer.current?.removeAll();
          };
        }

        if (radiusRef.current) {
          radiusRef.current.onclick = function () {
            radiusDropdownRef.current.classList.toggle('hidden'); // Show/hide the dropdown
          };
        }

        if (selectRef.current) {
          selectRef.current.onclick = () => {
            view.graphics.removeAll(); // Clear previous graphics
            sketchViewModelRef.current?.create('rectangle');
          };
        }
      }
    });

    // Cleanup on component unmount
    return () => {
      Object.keys(widgetsRef.current).forEach((key) => {
        const widget = widgetsRef.current[key];
        if (widget) {
          if (view.ui) {
            view.ui.remove(widget);
          }
          widget.destroy();
          widgetsRef.current[key] = null;
        }
      });
    };
  }, [view]);

  return (
    <div>
      <div ref={toolbarDivRef} id="toolbarDiv" className="esri-component esri-widget absolute top-44 left-[14px] z-10">
        <button ref={distanceRef} className="esri-widget--button esri-interactive esri-icon-measure-line" title="Distance Measurement Tool"></button>
        <button ref={areaRef} className="esri-widget--button esri-interactive esri-icon-measure-area" title="Area Measurement Tool"></button>
        <button ref={radiusRef} className="esri-widget--button esri-interactive esri-icon-dial" title="Radius Measurement Tool"></button>
        <button ref={selectRef} className="esri-widget--button esri-interactive esri-icon-checkbox-unchecked" title="Select by Rectangle"></button>
        <div ref={radiusDropdownRef} className="esri-widget esri-interactive absolute top-8 left-[60px] z-10 bg-white shadow-md p-2 rounded hidden">
          <label htmlFor="radius-select">Choose Radius:</label>
          <select id="radius-select" onChange={(e) => setSelectedRadius(Number(e.target.value))} value={selectedRadius}>
            <option value={0}>Choose km</option>
            <option value={50}>50 km</option>
            <option value={100}>100 km</option>
            <option value={200}>200 km</option>
            <option value={500}>500 km</option>
            <option value={1000}>1000 km</option>
          </select>
        </div>
        <button ref={clearRef} className="esri-widget--button esri-interactive esri-icon-trash" title="Clear Measurements"></button>
      </div>
    </div>
  );
};

export default Widgets;


