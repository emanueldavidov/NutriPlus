// CustomMedia Component: Handles the display of media content, like images or videos, within a responsive container.
// 
// Key Features:
// - Supports various media types (e.g., images, videos) with conditional rendering.
// - Responsive design ensures media adjusts to different screen sizes.
// - Can include additional media controls or overlays.

import PropTypes from 'prop-types';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink for linking media items

// Media Component: Renders individual media items (images/videos) in a grid layout.
// - Supports both loading placeholders and actual media content.
// - Applies responsive styling and hover effects for a dynamic user experience.

function Media(props) {
  const { loading = false, data } = props;  // Destructure props, setting loading to false by default

  return (
    <div className="flex flex-wrap -mx-2">
      {/* Map through media items or loading placeholders */}
      {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
        <div key={index} className="w-full md:w-1/2 px-2 mb-4 flex justify-center">
          <div className="w-64 text-center cursor-pointer transform transition-transform duration-300 hover:scale-105">
            {/* Conditional rendering: Display media item or loading placeholder */}
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
            {/* Media title or loading placeholder */}
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

// PropTypes for Media component: Ensures proper data structure and type checking
Media.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,  // Media title is required
      src: PropTypes.string.isRequired,    // Media source URL is required
      link: PropTypes.string.isRequired,   // Link associated with the media is required
    })
  ),
};

// CustomMedia Component: Wraps the Media component in a responsive container
// - Ensures the media grid is centered and fits within the maximum screen width.

function CustomMedia({ data }) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-lg">
        {/* Passes data to Media component, using a loading state if data is not provided */}
        <Media loading={data ? false : true} data={data || []} />
      </div>
    </div>
  );
}

// PropTypes for CustomMedia component: Ensures proper data structure and type checking
CustomMedia.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,  // Media title is required
      src: PropTypes.string.isRequired,    // Media source URL is required
      link: PropTypes.string.isRequired,   // Link associated with the media is required
    })
  ),
};

export default CustomMedia;
