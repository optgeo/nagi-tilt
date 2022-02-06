const style = href => {
  const e = document.createElement('link')
  e.href = href
  e.rel = 'stylesheet'
  document.head.appendChild(e)
}

const script = src => {
  const e = document.createElement('script')
  e.src = src
  document.head.appendChild(e)
}

const init = () => {
  style('style.css')
  style('https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css')
  script('https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js')
}
init()

let map
const showMap = async (texts) => {
  const mapgl = mapboxgl
  mapgl.accessToken = 
    'pk.eyJ1IjoiaGZ1IiwiYSI6ImlRSGJVUTAifQ.rTx380smyvPc1gUfZv1cmw'
  map = new mapgl.Map({
    container: 'map',
    hash: true,
    style: 'https://optgeo.github.io/nagi/style.json',
    maxZoom: 19.6,
    projection: {
      name: 'lambertConformalConic',
      center: [140, 45],
      parallels: [60, 30]
    }
  })
  map.addControl(new mapgl.NavigationControl())
  map.addControl(new mapgl.ScaleControl({
    maxWidth: 200, unit: 'metric'
  }))

  let voice = null
  for(let v of speechSynthesis.getVoices()) {
    console.log(v.name)
    if ([
      'Daniel',
      'Google UK English Male',
      'Microsoft Libby Online (Natural) - English (United Kingdom)'
    ].includes(v.name)) voice = v
  }

  map.on('load', () => {
    map.getCanvas().focus()
    map.getCanvas().addEventListener(
      'keydown',
      e => {
        // e.preventDefault()
        switch (e.which) {
          case 87: // w
            map.zoomTo(map.getZoom() - DELTA_Z, { easing: easing })
            break
          case 83: // s
            map.zoomTo(map.getZoom() + DELTA_Z, { easing: easing })
            break
          case 65: // a
            map.rotateTo(
              map.getBearing() - DELTA_BEARING, { easing: easing }
            )
            break
          case 68: // d
            map.rotateTo(
              map.getBearing() + DELTA_BEARING, { eaasing: easing }
            )
            break
          case 81: // q
            map.setPitch(map.getPitch() + DELTA_PITCH)
            break
          case 90: // z
            map.setPitch(map.getPitch() - DELTA_PITCH)
            break
        }
      }
    )
  })
}

window.onload = () => {
  showMap()
}
