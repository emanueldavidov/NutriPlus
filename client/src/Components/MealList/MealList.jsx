// import * as React from "react";

// export default function MealList({ dishes, setDishes }) {
//   if (!dishes || !Array.isArray(dishes)) {
//     return null; // Handle case where dishes is not defined or not an array
//   }

//   // Separate dishes by category
//   const starters = dishes.filter((dish) => dish.category === "starter");
//   const mainCourse = dishes.filter((dish) => dish.category === "main course");
//   const dessert = dishes.filter((dish) => dish.category === "dessert");

//   return (
//     <div>
//       {/* Starters List */}
//       {starters.length > 0 && (
//         <>
//           <h2 class="text-xl font-semibold mb-4">Starters</h2>
//           <ul class="w-full bg-white">
//             {starters.map((dish, index) => (
//               <React.Fragment key={index}>
//                 <li class="flex items-start">
//                   <div class="flex-shrink-0 mr-4">
//                     <img
//                       class="w-10 h-10 rounded-full"
//                       alt={dish.recipeName}
//                       src={dish.image}
//                     />
//                   </div>
//                   <div>
//                     <p class="text-base font-medium">{dish.recipeName}</p>
//                     <span class="text-sm text-gray-900">
//                       {dish.description}
//                     </span>
//                   </div>
//                 </li>
//                 {index < starters.length - 1 && (
//                   <li class="border-t ml-4 my-2"></li>
//                 )}
//               </React.Fragment>
//             ))}
//           </ul>
//         </>
//       )}

//       {/* Main Course List */}
//       {mainCourse.length > 0 && (
//         <>
//           <h2 class="text-xl font-semibold mb-4">Main Course</h2>
//           <ul class="w-full bg-white">
//             {mainCourse.map((dish, index) => (
//               <React.Fragment key={index}>
//                 <li class="flex items-start py-2">
//                   <div class="flex-shrink-0 mr-4">
//                     <img
//                       class="w-10 h-10 rounded-full"
//                       alt={dish.recipeName}
//                       src={dish.image}
//                     />
//                   </div>
//                   <div>
//                     <p class="text-base font-medium">{dish.recipeName}</p>
//                     <span class="text-sm text-gray-900">
//                       {dish.description}
//                     </span>
//                   </div>
//                 </li>
//                 {index < mainCourse.length - 1 && (
//                   <li class="border-t ml-4 my-2"></li>
//                 )}
//               </React.Fragment>
//             ))}
//           </ul>
//         </>
//       )}

//       {/* Dessert List */}
//       {dessert.length > 0 && (
//         <>
//           <>
//             <h2 class="text-xl font-semibold mb-4">Dessert</h2>
//             <ul class="w-full bg-white">
//               {dessert.map((dish, index) => (
//                 <React.Fragment key={index}>
//                   <li class="flex items-start py-2">
//                     <div class="flex-shrink-0 mr-4">
//                       <img
//                         class="w-10 h-10 rounded-full"
//                         alt={dish.recipeName}
//                         src={dish.image}
//                       />
//                     </div>
//                     <div>
//                       <p class="text-base font-medium">{dish.recipeName}</p>
//                       <span class="text-sm text-gray-900">
//                         {dish.description}
//                       </span>
//                     </div>
//                   </li>
//                   {index < dessert.length - 1 && (
//                     <li class="border-t ml-4 my-2"></li>
//                   )}
//                 </React.Fragment>
//               ))}
//             </ul>
//           </>
//         </>
//       )}
//     </div>
//   );
// }
