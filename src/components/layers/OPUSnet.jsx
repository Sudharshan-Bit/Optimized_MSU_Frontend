import React, { useEffect } from 'react';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import esriConfig from '@arcgis/core/config';
import sendJsonData from '../../apiService';

const OPUSnet = ({ onLayerReady,symbolType,is3D}) => {
  useEffect(() => {
    const date = new Date('2019-01-01');
    const input_data = {
      date: date,
      options: 'Over All Vs MYCS2', // Adjust options as needed
    };

    console.log(input_data)

    console.log("Pass",symbolType)
    console.log(is3D)

    sendJsonData(input_data)
      .then((response) => {
        const fetchedData = response.data;

        // Set API Key
        esriConfig.apiKey = 'AAPTxy8BH1VEsoebNVZXo8HurAU2wRtTCz35rS0IvyV5k0_FmOjKifjQ4MXaetOWAPxQ99ta0HCHYBSsLmJ-RxrEVoyLsT6hCItuii1Wq0Ctiu8ofOMIIcBYiR8_N3HQmOSC4MrerZZW_MiUovETiVP-I6qSZhn0k8qO1SF990cDX26ydD9ug32faqQlUjvebO0WHRrwPN3h0mdKEKlKMAZE8hjWCQHcEG7BM34DXJKiL7A.AT1_B2uSZ31B'; // Replace with your Esri API Key

        const blob = new Blob([JSON.stringify(fetchedData)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);

        const template = {
          title: 'Stacov Site Info',
          content: `<b>Site ID:</b> {SITEID}<br>
                    <b>Description:</b> {Description}<br>
                    <b>DOMES:</b> {DOMES}<br>`,
        };
        

        {is3D && symbolType === "object" ?
          console.log("3D"):console.log("2D")
        }

        console.log("asiudhlahsdlnasldhalsuhdlahsd",fetchedData)
        console.log();

        const renderer = {
          type: 'unique-value',
          field: 'STATUS',
          uniqueValueInfos: [
            {
              value: 'Present',
              symbol: {
                type: 'simple-marker',
                color: 'green',
                size: '8px',
                outline: {
                  color: 'white',
                  width: 1,
                },
              },
              label: `Present (${fetchedData.status_count})`,
            },
            {
              value: 'Not Present',
              symbol: {
                type: 'simple-marker',
                color: 'yellow',
                size: '8px',
                outline: {
                  color: 'white',
                  width: 1,
                },
              },
              label: `Not Present (${fetchedData.features.length - fetchedData.status_count})`,
            },
          ],
        };
        console.log("asdnkasn",fetchedData.status_count);

        // Create GeoJSONLayer
        const geojsonLayer = new GeoJSONLayer({
          url: url,
          popupTemplate: template,
          renderer: renderer,
          orderBy: {
            field: 'STATUS',
          },
        });

        // Notify parent component that the layer is ready
        if (onLayerReady) {
          onLayerReady(geojsonLayer);
        }
      })
      .catch((error) => {
        console.error('There was an error fetching STACOV data!', error);
      });
  }, [onLayerReady,symbolType]);

  return null; // This component does not render anything
};

export default OPUSnet;
