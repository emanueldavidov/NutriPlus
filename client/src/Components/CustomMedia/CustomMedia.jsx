import PropTypes from 'prop-types';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink from react-router-dom

function Media(props) {
  const { loading = false, data } = props;

 return (
    <div className="flex flex-wrap -mx-2">
      {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
        <div key={index} className="w-full md:w-1/2 px-2 mb-4 flex justify-center">
          <div className="w-64 text-center cursor-pointer transform transition-transform duration-300 hover:scale-105">
            {item ? (
              <RouterLink to={item.link} className="no-underline">
                <img
                  alt={item.title}
                  src={item.src}
                  className="w-full h-40 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
                />
              </RouterLink>
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-lg animate-pulse"></div>
            )}
            <div className="p-4">
              <p className="font-bold">
                {item ? item.title : <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired, // Ensure link is required in data shape
    })
  ),
};

function CustomMedia({ data }) {
  return (
 <div className="flex justify-center">
  <div className="w-full max-w-screen-lg">
    <Media loading={data ? false : true} data={data || []} />
  </div>
</div>

  );
}

CustomMedia.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};

export default CustomMedia;
