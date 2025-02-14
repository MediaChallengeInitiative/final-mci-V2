"use client";

import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

const GlobeComponent = () => {
  const chartRef = useRef<am4maps.MapChart | null>(null);

  useEffect(() => {
    // Create chart instance
    const chart = am4core.create("globeDiv", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";

    // Initial position
    chart.deltaLatitude = -20;
    chart.padding(0, 0, 0, 0);

    // Configure background
    chart.backgroundSeries.mapPolygons.template.polygon.fill =
      am4core.color("#1F2937");
    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0;

    // Create map polygon series
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = am4core.color("#A86450"); // Brown/orange color matching the screenshot
    polygonTemplate.fillOpacity = 0.4;
    polygonTemplate.stroke = am4core.color("#A86450");
    polygonTemplate.strokeWidth = 0.5;
    polygonTemplate.strokeOpacity = 0.3;

    // Add graticules
    const graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.mapLines.template.line.stroke = am4core.color("#A86450");
    graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
    graticuleSeries.fitExtent = false;

    // Disable zoom
    chart.maxZoomLevel = 1;

    // Start rotation animation
    let animation: am4core.Animation;

    chart.events.on("ready", () => {
      setTimeout(() => {
        if (!chart.isDisposed()) {
          animation = chart.animate(
            {
              property: "deltaLongitude",
              to: 100000
            },
            20000000
          );
        }
      }, 1000);
    });

    chartRef.current = chart;

    return () => {
      if (animation) {
        animation.stop();
      }
      chart.dispose();
    };
  }, []);

  return (
    <div
      id="globeDiv"
      className="w-full h-full"
      style={{
        backgroundColor: "transparent"
      }}
    />
  );
};

export default GlobeComponent;
