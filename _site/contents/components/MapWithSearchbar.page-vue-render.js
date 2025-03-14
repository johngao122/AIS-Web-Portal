
    var pageVueRenderFn = function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('header',{attrs:{"sticky":""}},[_c('navbar',{attrs:{"type":"dark"},scopedSlots:_u([{key:"brand",fn:function(){return [_c('a',{staticClass:"navbar-brand",attrs:{"href":"/AIS-Web-Portal/index.html","title":"Home"}},[_v("AIS Web Portal")])]},proxy:true}])},[_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/AIS-Web-Portal/index.html"}},[_v("Home")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/AIS-Web-Portal/contents/getting-started.html"}},[_v("Getting Started")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/AIS-Web-Portal/contents/architecture.html"}},[_v("Architecture")])]),_v(" "),_c('dropdown',{staticClass:"nav-link",scopedSlots:_u([{key:"header",fn:function(){return [_v("Components")]},proxy:true}])},[_v(" "),_c('dropdown-header',[_v("Map Components")]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/map.html"}},[_v("Map")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/MapWithSearchbar.html"}},[_v("MapWithSearchbar")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/MapControls.html"}},[_v("MapControls")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/LayerSelect.html"}},[_v("LayerSelect")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/VesselLayer.html"}},[_v("VesselLayer")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/TerminalLayer.html"}},[_v("TerminalLayer")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/Searchbar.html"}},[_v("Searchbar")])]),_v(" "),_c('dropdown-divider'),_v(" "),_c('pre',[_c('code',{pre:true},[_v("  <dropdown-header>Vessel Components</dropdown-header>\n  <li><a href=\"/AIS-Web-Portal/contents/components/vessel.html\" class=\"dropdown-item\">Vessel Overview</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/VesselInfoPanel.html\" class=\"dropdown-item\">VesselInfoPanel</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/VesselInformationPanel.html\" class=\"dropdown-item\">VesselInformationPanel</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/VesselInformationFloatingActionButton.html\" class=\"dropdown-item\">VesselInformationFloatingActionButton</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/VesselActivityTable.html\" class=\"dropdown-item\">VesselActivityTable</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/VesselActivitySingle.html\" class=\"dropdown-item\">VesselActivitySingle</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/VesselActivitySingleWithArrow.html\" class=\"dropdown-item\">VesselActivitySingleWithArrow</a></li>\n  <dropdown-divider></dropdown-divider>\n  \n  <dropdown-header>Port Components</dropdown-header>\n  <li><a href=\"/AIS-Web-Portal/contents/components/port.html\" class=\"dropdown-item\">Port Overview</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/PortServiceTable.html\" class=\"dropdown-item\">PortServiceTable</a></li>\n  <dropdown-divider></dropdown-divider>\n  \n  <dropdown-header>Utility Components</dropdown-header>\n  <li><a href=\"/AIS-Web-Portal/contents/components/DatePicker.html\" class=\"dropdown-item\">DatePicker</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/TimeSlider.html\" class=\"dropdown-item\">TimeSlider</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/Alert.html\" class=\"dropdown-item\">Alert</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/AutoLoginNotification.html\" class=\"dropdown-item\">AutoLoginNotification</a></li>\n</dropdown>\n<li><a href=\"/AIS-Web-Portal/contents/api.html\" class=\"nav-link\">API</a></li>\n<li><a href=\"/AIS-Web-Portal/contents/deployment.html\" class=\"nav-link\">Deployment</a></li>\n<li slot=\"right\">\n  <form class=\"navbar-form\">\n    <searchbar :data=\"searchData\" placeholder=\"Search\" :on-hit=\"searchCallback\" menu-align-right></searchbar>\n  </form>\n</li>\n")])])],1)],1)],1),_v(" "),_c('div',{attrs:{"id":"flex-body"}},[_c('overlay-source',{attrs:{"id":"site-nav","tag-name":"nav","to":"site-nav"}},[_c('div',{staticClass:"site-nav-top"},[_c('div',{staticClass:"fw-bold mb-2",staticStyle:{"font-size":"1.25rem"}},[_v("Contents")])]),_v(" "),_c('div',{staticClass:"nav-component slim-scroll"},[_c('site-nav',[_c('overlay-source',{staticClass:"site-nav-list site-nav-list-root",attrs:{"tag-name":"ul","to":"mb-site-nav"}},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/index.html"}},[_v("Home 🏠")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/getting-started.html"}},[_v("Getting Started")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/architecture.html"}},[_v("Architecture")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Components \n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon site-nav-rotate-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-dropdown-container-open site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Map Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/map.html"}},[_v("Map")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/MapWithSearchbar.html"}},[_v("MapWithSearchbar")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/MapControls.html"}},[_v("MapControls")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/LayerSelect.html"}},[_v("LayerSelect")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselLayer.html"}},[_v("VesselLayer")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/TerminalLayer.html"}},[_v("TerminalLayer")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/Searchbar.html"}},[_v("Searchbar")])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Vessel Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/vessel.html"}},[_v("Vessel Overview")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselInfoPanel.html"}},[_v("VesselInfoPanel")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselInformationPanel.html"}},[_v("VesselInformationPanel")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselInformationFloatingActionButton.html"}},[_v("VesselInformationFloatingActionButton")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselActivityTable.html"}},[_v("VesselActivityTable")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselActivitySingle.html"}},[_v("VesselActivitySingle")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselActivitySingleWithArrow.html"}},[_v("VesselActivitySingleWithArrow")])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Port Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/port.html"}},[_v("Port Overview")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/PortServiceTable.html"}},[_v("PortServiceTable")])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Utility Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/DatePicker.html"}},[_v("DatePicker")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/TimeSlider.html"}},[_v("TimeSlider")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/Alert.html"}},[_v("Alert")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/AutoLoginNotification.html"}},[_v("AutoLoginNotification")])])])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/api.html"}},[_v("API")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/deployment.html"}},[_v("Deployment")])])])])],1)],1)]),_v(" "),_c('div',{attrs:{"id":"content-wrapper"}},[_c('breadcrumb'),_v(" "),_m(0),_v(" "),_c('p',[_v("A comprehensive interactive map component that integrates vessel tracking, port services, and geospatial visualization with search functionality.")]),_v(" "),_m(1),_v(" "),_m(2),_v(" "),_c('p',[_v("The MapWithSearchbar component serves as the main visualization interface for the maritime traffic monitoring system. It combines a map view with search capabilities, vessel tracking, port services information, and interactive controls.")]),_v(" "),_m(3),_v(" "),_m(4),_m(5),_v(" "),_m(6),_v(" "),_m(7),_v(" "),_m(8),_v(" "),_m(9),_v(" "),_m(10),_v(" "),_m(11),_v(" "),_m(12),_v(" "),_m(13),_v(" "),_m(14),_v(" "),_m(15),_v(" "),_m(16),_v(" "),_m(17),_m(18),_v(" "),_m(19),_v(" "),_m(20)],1),_v(" "),_c('overlay-source',{attrs:{"id":"page-nav","tag-name":"nav","to":"page-nav"}},[_c('div',{staticClass:"nav-component slim-scroll"},[_c('overlay-source',{staticClass:"nav nav-pills flex-column my-0 small no-flex-wrap",attrs:{"id":"mb-page-nav","tag-name":"nav","to":"mb-page-nav"}},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#mapwithsearchbar-component"}},[_v("MapWithSearchbar Component‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#overview"}},[_v("Overview‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#props"}},[_v("Props‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#features"}},[_v("Features‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#map-visualization"}},[_v("Map Visualization‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#search-functionality"}},[_v("Search Functionality‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#vessel-tracking"}},[_v("Vessel Tracking‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#port-services"}},[_v("Port Services‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#time-controls"}},[_v("Time Controls‎")])]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#usage"}},[_v("Usage‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#implementation-details"}},[_v("Implementation Details‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#state-management"}},[_v("State Management‎")])])])])],1)]),_v(" "),_c('scroll-top-button')],1),_v(" "),_m(21)])}
};
    var pageVueStaticRenderFns = [function anonymous(
) {
with(this){return _c('h1',{attrs:{"id":"mapwithsearchbar-component"}},[_v("MapWithSearchbar Component"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#mapwithsearchbar-component","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_c('strong',[_v("File Location")]),_v(": "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("src/components/MapWithSearchbar.tsx")])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"overview"}},[_v("Overview"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#overview","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"props"}},[_v("Props"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#props","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"markbind-table table table-bordered table-striped"},[_c('thead',[_c('tr',[_c('th',[_v("Prop")]),_v(" "),_c('th',[_v("Type")]),_v(" "),_c('th',[_v("Default")]),_v(" "),_c('th',[_v("Description")])])]),_v(" "),_c('tbody',[_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("mapStyle")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("string")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("\"mapbox://styles/mapbox/light-v10\"")])]),_v(" "),_c('td',[_v("Custom map style URL")])]),_v(" "),_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("initialViewState")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("object")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("{ longitude: 103.8198, latitude: 1.3521, zoom: 11, pitch: 0, bearing: 0 }")])]),_v(" "),_c('td',[_v("Initial map view configuration")])])])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"features"}},[_v("Features"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#features","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"map-visualization"}},[_v("Map Visualization"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#map-visualization","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Interactive map with WebGL-based rendering using deck.gl")]),_v(" "),_c('li',[_v("Multiple layer support (vessels, terminals, fairways, separation zones)")]),_v(" "),_c('li',[_v("Custom vessel markers with heading indicators")]),_v(" "),_c('li',[_v("Smooth animations for vessel movements")]),_v(" "),_c('li',[_v("Zoom and pan controls")])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"search-functionality"}},[_v("Search Functionality"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#search-functionality","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Real-time vessel search by name, IMO, or MMSI")]),_v(" "),_c('li',[_v("Search results highlighting")]),_v(" "),_c('li',[_v("Result count display")]),_v(" "),_c('li',[_v("Auto-focus on selected vessels")])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"vessel-tracking"}},[_v("Vessel Tracking"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#vessel-tracking","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Real-time vessel position updates")]),_v(" "),_c('li',[_v("Vessel path visualization")]),_v(" "),_c('li',[_v("Historical trajectory playback")]),_v(" "),_c('li',[_v("Heading and bearing calculations")]),_v(" "),_c('li',[_v("Vessel information tooltips")])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"port-services"}},[_v("Port Services"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#port-services","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Port service level monitoring")]),_v(" "),_c('li',[_v("Terminal data visualization")]),_v(" "),_c('li',[_v("Service performance metrics")]),_v(" "),_c('li',[_v("Time-based analysis")])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"time-controls"}},[_v("Time Controls"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#time-controls","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Time slider for historical data")]),_v(" "),_c('li',[_v("Animation controls for vessel movements")]),_v(" "),_c('li',[_v("Date range selection")]),_v(" "),_c('li',[_v("Real-time updates")])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"usage"}},[_v("Usage"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#usage","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs tsx"}},[_c('span',[_v("<MapWithSearchbar\n")]),_c('span',[_v("    mapStyle="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"mapbox://styles/mapbox/dark-v10\"")]),_v("\n")]),_c('span',[_v("    initialViewState={initialViewState}\n")]),_c('span',[_v("/>\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"implementation-details"}},[_v("Implementation Details"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#implementation-details","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"state-management"}},[_v("State Management"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#state-management","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("\n")])])])}
},function anonymous(
) {
with(this){return _c('footer',[_c('div',{staticClass:"text-center"},[_c('small',[_v("AIS Web Portal Documentation | [Generated by "),_c('a',{attrs:{"href":"https://markbind.org/"}},[_v("MarkBind 5.5.3")]),_v("]")])])])}
}];
  