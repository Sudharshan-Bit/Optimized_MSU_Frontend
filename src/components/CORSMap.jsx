import React, { useEffect, useRef, useState } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import Widgets from './layers/Widgets'; // Widgets Component
import StacovFile from './layers/StacovFile';
import Overall from './layers/Overall';
import OPUSnet from './layers/OPUSnet';
import OverallVsMycs2 from './layers/OverallVsMycs2';

const CORSMap = ({ selectedLayer = null, is3D = false }) => {
  const mapRef = useRef(null); // Map container reference
  const viewRef = useRef(null); // Ref for storing the map view (2D or 3D)
  const [map, setMap] = useState(null); // State to store map instance
  const [symbolType, setSymbolType] = useState('icon'); // State for symbol type
  const [isMapLoaded, setIsMapLoaded] = useState(false); // State to track map loading

  useEffect(() => {
    const mapInstance = new Map({
      basemap: 'gray-vector',
    });

    const view = is3D
      ? new SceneView({
          container: mapRef.current,
          map: mapInstance,
          center: [-99.7129, 37.0902], // Default center for 3D
          zoom: 4,
        })
      : new MapView({
          container: mapRef.current,
          map: mapInstance,
          center: [-95.7129, 37.0902], // Default center for 2D
          zoom: 3,
        });

    view.when(() => {
      setIsMapLoaded(true); // Mark map as loaded
    });

    viewRef.current = view;
    setMap(mapInstance);

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [is3D]);

  const handleLayerReady = (layer) => {
    if (map) {
      map.layers.removeAll();
      map.add(layer);
    }
  };

  const handleSymbolChange = (event) => {
    setSymbolType(event.target.value);
  };

  const toggleFullscreen = () => {
    if (mapRef.current) {
      if (!document.fullscreenElement) {
        mapRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const renderLayerComponent = () => {
    switch (selectedLayer) {
      case 'Static JSON + STACOV File':
        return <StacovFile onLayerReady={handleLayerReady} symbolType={symbolType} is3D={is3D} />;
      case 'Over All Site Info':
        return <Overall onLayerReady={handleLayerReady} symbolType={symbolType} is3D={is3D} />;
      case 'OPUSNET Data':
        return <OPUSnet onLayerReady={handleLayerReady} symbolType={symbolType} is3D={is3D} />;
      case 'Over All Vs MYCS2':
        return<OverallVsMycs2 onLayerReady={handleLayerReady} symbolType={symbolType} is3D={is3D} />;
      default:
        if (map) {
          map.layers.removeAll();
        }
        return null;
    }
  };

  return (
    <div>
      <div className="cors-map" style={{ position: 'relative' }}>
        <div ref={mapRef} className="h-[88vh] w-full"></div>

        {/* Widgets */}
        {isMapLoaded && (
          <Widgets view={viewRef.current} onToggleFullscreen={toggleFullscreen} />
        )}

        {/* Render the selected layer component */}
        {renderLayerComponent()}
      </div>

      {/* Control Panel */}
      {is3D && (
        <div
          style={{
            position: 'absolute',
            top: 400,
            right: 18,
            padding: 12,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
          }}
        >
          Show points as:
          <div>
            <input
              type="radio"
              name="symbolType"
              value="icon"
              checked={symbolType === 'icon'}
              onChange={handleSymbolChange}
            />
            <label htmlFor="asIcon">2D shape</label>
          </div>
          <div>
            <input
              type="radio"
              name="symbolType"
              value="object"
              checked={symbolType === 'object'}
              onChange={handleSymbolChange}
            />
            <label htmlFor="asObject">3D shape</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default CORSMap;
