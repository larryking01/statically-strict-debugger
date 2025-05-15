'use script'

// elements declarations
const homepageButton = document.querySelector('.entry_point');
const homepage = document.querySelector('main');
const mainRoomsContainer = document.querySelector('.application_container') as HTMLElement;
const advanceFeaturesContainer = document.querySelector('.advanced_features_container');
const nav = document.querySelector('nav');
const loader = document.querySelector('.loader-container') as HTMLElement;


// imports
import Light from './basicSettings';
import AdvanceSettings from './advanceSettings';


// object creation
const lightController = new Light();
const advancedSettings = new AdvanceSettings();


// global variables
let selectedComponent;
let isWifiActive = true;


// Event handlers
// hide homepage after button is clicked
homepageButton?.addEventListener('click', function(e) {
    lightController.addHidden(homepage);
    lightController.removeHidden(loader);
    
    setTimeout(() => {
        lightController.removeHidden(mainRoomsContainer);
        lightController.removeHidden(nav);

    }, 1000);
})



mainRoomsContainer?.addEventListener('click', (e) => {
    const selectedElement = e.target as Element;  // typecast selectedElement to an actual element
    
    // when click occurs on light switch
    if (selectedElement?.closest(".light-switch")) {
        console.log("light bulb clicked")
        const lightSwitch = selectedElement.closest(".basic_settings_buttons")
        ?.firstElementChild as HTMLElement; // points back to the light bulb button
        
        lightController.toggleLightSwitch(lightSwitch); // pass the light bulb button to toggleLightSwitch
        return;
    }

    // when click occurs on advance modal
    if (selectedElement?.closest('.advance-settings_modal')) {
        const advancedSettingsBtn = selectedElement.closest('.advance-settings_modal');
        advancedSettings.modalPopUp(advancedSettingsBtn!);
    }
});



mainRoomsContainer?.addEventListener('change', (e) => {
    const slider = e.target;
    // only html input elements and elements that extend the HTMLInputElement class
    // have the value property
    if( slider instanceof HTMLInputElement ) {   
        const value = Number.parseInt(slider?.value);     // converted to number
        lightController.handleLightIntensitySlider(slider, value);
    }
})


// advance settings modal
advanceFeaturesContainer?.addEventListener('click', (e) => {
    const selectedElement = e.target as HTMLElement;   // typecasting to HTMLElement so that .closest() property is valid

    if (selectedElement?.closest('.close-btn')) {
       advancedSettings.closeModalPopUp()
    }

    // display customization markup
    if (selectedElement?.closest('.customization-btn')) {
        advancedSettings.displayCustomization(selectedElement);
    }

    // set light on time customization
    if (selectedElement?.matches('.defaultOn-okay')) {
        advancedSettings.customizeAutomaticOnPreset(selectedElement);
    }
    
    // set light off time customization
    if (selectedElement?.matches('.defaultOff-okay')) {
        advancedSettings.customizeAutomaticOffPreset(selectedElement);
    }

    // cancel light time customization
    if (selectedElement?.textContent?.includes("Cancel")) {   // textContent was possibly null
        if (selectedElement.matches('.defaultOn-cancel')) {
            advancedSettings.customizationCancelled(selectedElement, '.defaultOn');
        } else if (selectedElement.matches('.defaultOff-cancel')) {
            advancedSettings.customizationCancelled(selectedElement, '.defaultOff');
        }
    }
});

