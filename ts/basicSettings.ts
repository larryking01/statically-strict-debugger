'use strict'

import General from "./general.js";
import { RoomsData } from "./general.js";


interface LightComponentSelectors {
    room: string | undefined,
    componentData: RoomsData,
    childElement: HTMLElement | null,
    background: HTMLElement | null
}


class Light extends General {
    constructor() {
        super();
    }

    notification (message: string) {
        return `
            <div class="notification">
                <div>
                    <img src="./assets/svgs/checked.svg" alt="checked svg icon on notifications" >
                </div>
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
        }, 5000);
    }

    lightSwitchOn (lightButtonElement: Element) {
        lightButtonElement.setAttribute('src', './assets/svgs/light_bulb.svg');
        lightButtonElement.setAttribute('data-lightOn', './assets/svgs/light_bulb_off.svg');
    }

    lightSwitchOff (lightButtonElement: Element ) {
        lightButtonElement.setAttribute('src', './assets/svgs/light_bulb_off.svg');
        lightButtonElement.setAttribute('data-lightOn', './assets/svgs/light_bulb.svg');
    };

    lightComponentSelectors(lightButtonElement: Element) {
        const room = this.getSelectedComponentName(lightButtonElement);

        if (!room) return null;
        const componentData = this.getComponent(room)   // initially room[0] so light on/off was not working. name of room is not an array.
        const childElement = lightButtonElement.firstElementChild;
        const background = this.closestSelector(lightButtonElement, '.rooms', 'img');
        return { room, componentData, childElement, background };
    }

    toggleLightSwitch(lightButtonElement: HTMLElement) {
        const { componentData: component, childElement, background } = this.lightComponentSelectors(lightButtonElement) as LightComponentSelectors;
        
        const slider = this.closestSelector(lightButtonElement, '.rooms', '#light_intensity')

        if (!component) return;

        component.isLightOn = !component.isLightOn;

        if (component.isLightOn) {
            this.lightSwitchOn(childElement!);
            component.lightIntensity = 5;
            const lightIntensity = component.lightIntensity / 10;
            this.handleLightIntensity(background!, lightIntensity);
            (slider as HTMLInputElement).value = component.lightIntensity.toString();
        } else {
            this.lightSwitchOff(childElement!);
            this.handleLightIntensity(background!, 0);
            (slider as HTMLInputElement).value = "0";
        }
    }


    handleLightIntensitySlider(element: HTMLElement, intensity: number) {
        const selectors = this.lightComponentSelectors(element);

        if(!selectors) return 

        const { componentData } = selectors;

        if (typeof intensity !== 'number' || Number.isNaN( intensity)) return;

        componentData!.lightIntensity = intensity; 

        const lightSwitch: Element | null = this.closestSelector(element, '.rooms', '.light-switch');

        if (intensity === 0) {
            componentData!.isLightOn = false;
            this.sliderLight(componentData!.isLightOn, lightSwitch as Element );
            return;
        }

        if( !componentData || !lightSwitch ) return
        
        componentData.isLightOn = intensity !== 0
        this.sliderLight(componentData.isLightOn, lightSwitch);
    }


    sliderLight(isLightOn: boolean, lightButtonElement: Element): void {

        const selectors = this.lightComponentSelectors(lightButtonElement);
        if (!selectors) return;

        const { 
                componentData: component, 
                childElement, background 
              } = selectors

        if (!( component && childElement && background )) return;
        
        if (isLightOn) {
            this.lightSwitchOn(childElement as Element);
            const lightIntensity = component.lightIntensity / 10;
            this.handleLightIntensity(background as HTMLElement, lightIntensity);
        } else {
            this.lightSwitchOff(childElement as Element);
            this.handleLightIntensity(background as HTMLElement, 0);
        }
    }

}



export default Light;
