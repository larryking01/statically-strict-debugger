export interface RoomsData {
  name: string;
  lightIntensity: number;
  numOfLights: number;
  isLightOn: boolean;
  autoOn: string;
  autoOff: string;
  usage: number[];
  element?: Element,
  [key: string]: any
};


interface roomDataMap {
    [index: string]: RoomsData
}


class General {

    isLightOn: boolean
    lightIntensity: number

    constructor () {
        this.isLightOn = false;
        this.lightIntensity = 5;
    }

    // error here
    componentsData: {[key: string]: RoomsData } = {
        hall: { name: 'hall', lightIntensity: 5, numOfLights: 6, isLightOn: false, autoOn: '06:30', autoOff: '22:00', usage: [22, 11, 12, 10, 12, 17, 22] }, 
        bedroom: { name: 'bedroom', lightIntensity: 5,  numOfLights: 3, isLightOn: false, autoOn: '06:30', autoOff: '22:00', usage: [18, 5, 7, 5, 6, 6, 18] },
        bathroom: { name: 'bathroom', lightIntensity: 5,  numOfLights: 1, isLightOn: false, autoOn: '06:30', autoOff: '22:00', usage: [2, 1, 1, 1, 1, 3, 3] },
        'outdoor lights': { name: 'outdoor lights', lightIntensity: 5,  numOfLights: 6, isLightOn: false, autoOn: '06:30', autoOff: '22:00', usage: [15, 12, 13, 9, 12, 13, 18] },
        'guest room': { name: 'guest room', lightIntensity: 5,  numOfLights: 4, isLightOn: false, autoOn: '06:30', autoOff: '22:00', usage: [12, 10, 3, 9, 5, 5, 18] },
        kitchen: { name: 'kitchen', lightIntensity: 5,  numOfLights: 3, isLightOn: false, autoOn: '06:30', autoOff: '22:00', usage: [12, 19, 13, 11, 12, 13, 18] },
        'walkway & corridor': { name: 'walkway & corridor', lightIntensity: 5,  numOfLights: 8, isLightOn: false, autoOn: '06:30', autoOff: '22:00', usage: [12, 19, 13, 15, 22, 23, 18] },
    }

    wifiConnections = [
        {id: 0, wifiName: 'Inet service', signal: 'excellent'},
        {id: 1, wifiName: 'Kojo_kwame121', signal: 'poor'},
        {id: 2, wifiName: 'spicyalice', signal: 'good'},
        {id: 3, wifiName: 'virus', signal: 'good'},
    ]

    getComponent(name: string ): RoomsData | undefined { // error here
        return this.componentsData[`${ name }`];
    }

    getWifi() {
        return this.wifiConnections;
    }

    getSelectedComponentName(element: Element, ancestorIdentifier='.rooms', elementSelector='p'): string | null {
        const selectedElement = this.closestSelector(element, ancestorIdentifier, elementSelector);
        if (!selectedElement || !selectedElement.textContent) return null;

        const name = selectedElement.textContent.toLowerCase();
        return name;
    }

    getComponentData(element: HTMLElement, ancestorIdentifier: string, childElement: string) {
        const room = this.getSelectedComponentName(element, ancestorIdentifier, childElement);
        
        return room ? this.getComponent( room ) : null
   
    }

    renderHTML (element: string, position: InsertPosition, container: HTMLElement) {
        container.insertAdjacentHTML(position, element);
    }

    notification (message: string) {
        return `
            <div class="notification">
                <p>${message}</p>
            </div>
        `;

    }

    displayNotification (message: string, position: InsertPosition, container: HTMLElement) {
        const html = this.notification(message);
        this.renderHTML(html, position, container);
    }

    removeNotification (element: Element) {
        setTimeout(() => {
            element.remove();
        }, 2000);
    }

    selector(identifier: string): HTMLElement | null {
        return document.querySelector(identifier);       
    }

    closestSelector(selectedElement: Element, ancestorIdentifier: string, childSelector: string) : HTMLElement | null {
        const closestAncestor = selectedElement.closest(ancestorIdentifier);
        return closestAncestor ? closestAncestor.querySelector(childSelector) : null;
    }

    handleLightIntensity(element: HTMLElement, lightIntensity: number ) {
        element.style.filter = `brightness(${lightIntensity})`;
    }

    updateComponentData(data: roomDataMap) {
        this.componentsData
    }

    updateMarkupValue(element: Element, value: string) {
        element.textContent = value;
    }

    toggleHidden(element: Element) {
        element.classList.toggle('hidden');
    }

    removeHidden(element: HTMLElement | null ) {
        element?.classList.remove('hidden');
    }
    
    addHidden(element: HTMLElement | null) {
        element?.classList.add('hidden');
    }

    setComponentElement(roomData: RoomsData) {
        let parent; 
        if (roomData.name === 'walkway & corridor') {
            const elementClassName =  this.formatTextToClassName( roomData.name )
            parent = this.selector(`.${ elementClassName }`);
            // parent = this.selector('.corridor');
        } else if (roomData.name === 'guest room') {
            const elementClassName = this.formatTextToClassName(roomData.name);
            parent = this.selector(`.${elementClassName}`);
        } else if (roomData.name === 'outdoor lights') {
            const elementClassName =  this.formatTextToClassName( roomData.name )
            parent = this.selector(`.${ elementClassName }`);

        } else {
            parent = this.selector(`.${roomData.name}`);
        }
        
        const buttonElement = parent?.querySelector('.light-switch');

        if (roomData.element) return;
        
        if (buttonElement instanceof HTMLElement) {
            roomData.element = buttonElement;
        }
    }

    formatTextToClassName(name: string) {
        const words = name.split(' ');
        const newWord = words.join('_');
        return newWord;
    }
}

export default General