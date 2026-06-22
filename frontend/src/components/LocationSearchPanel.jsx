const LocationSearchPanel = ({
  suggestions,
  onLocationSelect,
}) => {
  return (
    <div>
      {suggestions.map((item) => (
        <div
          key={`${item.lat}-${item.lon}-${item.name}`}
          onClick={() => onLocationSelect(item)}
          className="flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-4 cursor-pointer"
        >
          <h2 className="h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-2-fill text-xl"></i>
          </h2>

          <h5 className="font-medium">{item.name}</h5>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
