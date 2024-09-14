import React from 'react';
import Chart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

const RadarChart = () => {
  const navigate = useNavigate();

  const getMostRecommendedArea = () => {
    const recommendedAreas = [60, 75, 80, 85, 70];
    const labels = [
      'Environmental Science',
      'Engineering',
      'Biochemistry',
      'Environmental Management',
      'Research & Development',
    ];
    const maxIndex = recommendedAreas.indexOf(Math.max(...recommendedAreas));
    return labels[maxIndex];
  };

  const mostRecommendedArea = getMostRecommendedArea();

  const handleLabelClick = (label) => {
    navigate(`/learn`);
  };

  const handleProceedClick = () => {
    navigate(`/learn`);
  };

  const chartOptions = {
    chart: {
      type: 'radar',
      toolbar: {
        show: false,
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const label = chartOptions.labels[config.dataPointIndex];
          handleLabelClick(label);
        },
      },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: '#c0c0c0',
          connectorColors: '#c0c0c0',
        },
      },
    },
    series: [
      {
        name: 'Your Strengths',
        color: '#ff9800',
        data: [85, 65, 90, 70, 80],
      },
      {
        name: 'Recommended Areas',
        data: [60, 75, 80, 85, 70],
      },
    ],
    labels: [
      '🌿 Environmental Science',
      '⚛️ Engineering',
      '🧪 Biochemistry',
      '🌍 Environmental Management',
      '🔬 Research & Development',
    ],
    fill: {
      opacity: 0.4,
      colors: ['#ff9800', '#00e396'],
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#ff5722', '#00e396'],
    },
    markers: {
      size: 6,
      colors: ['#fff'],
      strokeColors: ['#ff5722', '#00e396'],
      strokeWidth: 2,
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          colors: '#000000', // Always black labels
        },
        offsetY: 20,
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => `${value}%`,
      },
    },
    annotations: {
      points: [
        {
          x: '🌿 Environmental Science',
          y: 85,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: '#ff5722',
            shape: 'circle',
          },
          label: {
            text: '🌿 Environmental Science',
            offsetY: -110,
            style: {
              background: 'black',
              color: '#000000', // Black annotation text
              fontSize: '14px',
              fontWeight: 'bold',
            },
          },
        },
        {
          x: '⚛️ Engineering',
          y: 65,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: '#ff5722',
            shape: 'circle',
          },
          label: {
            text: '⚛️ Engineering',
            offsetY: -40,
            style: {
              background: 'transparent',
              color: '#000000', // Black annotation text
              fontSize: '14px',
              fontWeight: 'bold',
            },
          },
        },
        {
          x: '🧪 Biochemistry',
          y: 90,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: '#ff5722',
            shape: 'circle',
          },
          label: {
            text: '🧪 Biochemistry',
            offsetY: -40,
            style: {
              background: 'transparent',
              color: '#000000', // Black annotation text
              fontSize: '14px',
              fontWeight: 'bold',
            },
          },
        },
        {
          x: '🌍 Environmental Management',
          y: 70,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: '#00e396',
            shape: 'circle',
          },
          label: {
            text: '🌍 Environmental Management',
            offsetY: -40,
            style: {
              background: 'transparent',
              color: '#000000', // Black annotation text
              fontSize: '14px',
              fontWeight: 'bold',
            },
          },
        },
        {
          x: '🔬 Research & Development',
          y: 80,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: '#00e396',
            shape: 'circle',
          },
          label: {
            text: '🔬 Research & Development',
            offsetY: -40,
            style: {
              background: 'transparent',
              strokeColor:"black",
              fontSize: '14px',
              fontWeight: 'bold',
            },
          },
        },
      ],
    },
  };

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-200 p-8 shadow-lg rounded-lg text-black dark:text-white">
      <h2 className="text-3xl font-bold mb-4 text-center text-black">Career Path Recommendations</h2>
      <p className="text-xl mb-6 text-center text-black">Based on Your Strengths</p>
      <Chart options={chartOptions} series={chartOptions.series} type="radar" height={500} />
      <div className="mt-6 text-center">
        <button
          onClick={handleProceedClick}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Proceed with the Most Recommended Area →
        </button>
      </div>
    </div>
  );
};

export default RadarChart;
