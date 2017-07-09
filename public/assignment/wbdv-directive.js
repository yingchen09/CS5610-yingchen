/**
 * Created by yingchen on 2017/6/30.
 */
// (function (){
//     angular
//         .module("WbdvDirective")
//         .directive("wbdvSortable", wbdvSortable);
//     function wbdvSortable() {
//         function linker(scope, element, attrs) {
//             var start = -1;
//             var end = -1;
//
//             $(element).sortable({
//                 start: function(event, ui) {
//                     start = ui.item.index();
//                 },
//                 stop: function(event, ui) {
//                     end = ui.item.index();
//
//                     scope.callback({
//                         start: start,
//                         end: end
//                     })
//                 }
//             });
//         }
//     }
//     return {
//         link: linker,
//         callback: '&'
//     };
// })();