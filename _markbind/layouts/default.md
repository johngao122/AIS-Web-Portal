<head-bottom>
  <link rel="stylesheet" href="{{baseUrl}}/stylesheets/main.css">
</head-bottom>

<header sticky>
  <navbar type="dark">
    <a slot="brand" href="{{baseUrl}}/index.html" title="Home" class="navbar-brand">AIS Web Portal</a>
    <li><a href="{{baseUrl}}/index.html" class="nav-link">Home</a></li>
    <li><a href="{{baseUrl}}/contents/getting-started.html" class="nav-link">Getting Started</a></li>
    <li><a href="{{baseUrl}}/contents/architecture.html" class="nav-link">Architecture</a></li>
    <dropdown text="Components" class="nav-item">
      <dropdown-header>Map Components</dropdown-header>
      <li><a href="{{baseUrl}}/contents/components/map.html" class="dropdown-item">Map</a></li>
      <li><a href="{{baseUrl}}/contents/components/MapWithSearchbar.html" class="dropdown-item">MapWithSearchbar</a></li>
      <li><a href="{{baseUrl}}/contents/components/MapControls.html" class="dropdown-item">MapControls</a></li>
      <li><a href="{{baseUrl}}/contents/components/LayerSelect.html" class="dropdown-item">LayerSelect</a></li>
      <li><a href="{{baseUrl}}/contents/components/VesselLayer.html" class="dropdown-item">VesselLayer</a></li>
      <li><a href="{{baseUrl}}/contents/components/TerminalLayer.html" class="dropdown-item">TerminalLayer</a></li>
      <li><a href="{{baseUrl}}/contents/components/Searchbar.html" class="dropdown-item">Searchbar</a></li>
      <dropdown-divider></dropdown-divider>
      
      <dropdown-header>Vessel Components</dropdown-header>
      <li><a href="{{baseUrl}}/contents/components/vessel.html" class="dropdown-item">Vessel Overview</a></li>
      <li><a href="{{baseUrl}}/contents/components/VesselInfoPanel.html" class="dropdown-item">VesselInfoPanel</a></li>
      <li><a href="{{baseUrl}}/contents/components/VesselInformationPanel.html" class="dropdown-item">VesselInformationPanel</a></li>
      <li><a href="{{baseUrl}}/contents/components/VesselInformationFloatingActionButton.html" class="dropdown-item">VesselInformationFloatingActionButton</a></li>
      <li><a href="{{baseUrl}}/contents/components/VesselActivityTable.html" class="dropdown-item">VesselActivityTable</a></li>
      <li><a href="{{baseUrl}}/contents/components/VesselActivitySingle.html" class="dropdown-item">VesselActivitySingle</a></li>
      <li><a href="{{baseUrl}}/contents/components/VesselActivitySingleWithArrow.html" class="dropdown-item">VesselActivitySingleWithArrow</a></li>
      <dropdown-divider></dropdown-divider>
      
      <dropdown-header>Port Components</dropdown-header>
      <li><a href="{{baseUrl}}/contents/components/port.html" class="dropdown-item">Port Overview</a></li>
      <li><a href="{{baseUrl}}/contents/components/PortServiceTable.html" class="dropdown-item">PortServiceTable</a></li>
      <dropdown-divider></dropdown-divider>
      
      <dropdown-header>Utility Components</dropdown-header>
      <li><a href="{{baseUrl}}/contents/components/DatePicker.html" class="dropdown-item">DatePicker</a></li>
      <li><a href="{{baseUrl}}/contents/components/TimeSlider.html" class="dropdown-item">TimeSlider</a></li>
      <li><a href="{{baseUrl}}/contents/components/Alert.html" class="dropdown-item">Alert</a></li>
      <li><a href="{{baseUrl}}/contents/components/AutoLoginNotification.html" class="dropdown-item">AutoLoginNotification</a></li>
    </dropdown>
    <li><a href="{{baseUrl}}/contents/api.html" class="nav-link">API</a></li>
    <li><a href="{{baseUrl}}/contents/deployment.html" class="nav-link">Deployment</a></li>
    <li slot="right">
      <form class="navbar-form">
        <searchbar :data="searchData" placeholder="Search" :on-hit="searchCallback" menu-align-right></searchbar>
      </form>
    </li>
  </navbar>
</header>

<div id="flex-body">
  <nav id="site-nav">
    <div class="site-nav-top">
      <div class="fw-bold mb-2" style="font-size: 1.25rem;">Contents</div>
    </div>
    <div class="nav-component slim-scroll">
      <site-nav>
* [Home :house:]({{ baseUrl }}/index.html)
* [Getting Started]({{baseUrl}}/contents/getting-started.html)
* [Architecture]({{baseUrl}}/contents/architecture.html)
* Components :expanded:
  * Map Components
    * [Map]({{baseUrl}}/contents/components/map.html)
    * [MapWithSearchbar]({{baseUrl}}/contents/components/MapWithSearchbar.html)
    * [MapControls]({{baseUrl}}/contents/components/MapControls.html)
    * [LayerSelect]({{baseUrl}}/contents/components/LayerSelect.html)
    * [VesselLayer]({{baseUrl}}/contents/components/VesselLayer.html)
    * [TerminalLayer]({{baseUrl}}/contents/components/TerminalLayer.html)
    * [Searchbar]({{baseUrl}}/contents/components/Searchbar.html)
  * Vessel Components
    * [Vessel Overview]({{baseUrl}}/contents/components/vessel.html)
    * [VesselInfoPanel]({{baseUrl}}/contents/components/VesselInfoPanel.html)
    * [VesselInformationPanel]({{baseUrl}}/contents/components/VesselInformationPanel.html)
    * [VesselInformationFloatingActionButton]({{baseUrl}}/contents/components/VesselInformationFloatingActionButton.html)
    * [VesselActivityTable]({{baseUrl}}/contents/components/VesselActivityTable.html)
    * [VesselActivitySingle]({{baseUrl}}/contents/components/VesselActivitySingle.html)
    * [VesselActivitySingleWithArrow]({{baseUrl}}/contents/components/VesselActivitySingleWithArrow.html)
  * Port Components
    * [Port Overview]({{baseUrl}}/contents/components/port.html)
    * [PortServiceTable]({{baseUrl}}/contents/components/PortServiceTable.html)
  * Utility Components
    * [DatePicker]({{baseUrl}}/contents/components/DatePicker.html)
    * [TimeSlider]({{baseUrl}}/contents/components/TimeSlider.html)
    * [Alert]({{baseUrl}}/contents/components/Alert.html)
    * [AutoLoginNotification]({{baseUrl}}/contents/components/AutoLoginNotification.html)
* [API]({{baseUrl}}/contents/api.html)
* [Deployment]({{baseUrl}}/contents/deployment.html)
      </site-nav>
    </div>
  </nav>
  <div id="content-wrapper">
    <breadcrumb />
    {{ content }}
  </div>
  <nav id="page-nav">
    <div class="nav-component slim-scroll">
      <page-nav />
    </div>
  </nav>
  <scroll-top-button></scroll-top-button>
</div>

<footer>
  <div class="text-center">
    <small>AIS Web Portal Documentation | [Generated by {{MarkBind}}]</small>
  </div>
</footer>
