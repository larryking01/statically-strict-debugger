/**
 * @jest-environment jsdom
 */

import Light from '../ts/basicSettings';
import { JSDOM } from 'jsdom';

describe('Light class tests', () => {
  let light: Light;
  let container: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="rooms">
        <div class="hall">
          <button class="light-switch">
            <img id="bulb" src="" data-lighton="" />
          </button>
          <img id="light_intensity" />
        </div>
      </div>
    `;

    light = new Light();
    container = document.body;
  });

  test('should return correct notification HTML', () => {
    const message = 'Light turned on';
    const html = light.notification(message);
    expect(html).toContain(message);
    expect(html).toContain('<img src="./assets/svgs/checked.svg"');
  });
  

test('should toggle light switch ON correctly', () => {
  document.body.innerHTML = `
    <div class="rooms">
      <div class="component_data" data-name="hall" data-status="off">
        <div class="child"></div>
        <div class="background"></div>
        <img class="light_bulb_icon" src="" />
        <button id="light-button">Toggle</button>
      </div>
    </div>
  `;

  const button = document.getElementById('light-button') as HTMLElement;

  const light = new Light();
  light.toggleLightSwitch(button);

  const roomData = light.getComponent('hall');

  expect(roomData?.isLightOn).toBe(true); // <- now should pass
  const icon = document.querySelector('.light_bulb_icon') as HTMLImageElement;
  expect(icon.getAttribute('src')).toBe('./assets/svgs/light_bulb.svg');
});

  test('should toggle light switch OFF correctly', () => {
    const button = document.querySelector('.light-switch') as HTMLElement;
    const img = button.querySelector('img') as HTMLElement;

    // simulate it being on first
    const roomData = light.getComponent('hall');
    if (roomData) roomData.isLightOn = true;

    light.toggleLightSwitch(button);

    expect(roomData?.isLightOn).toBe(false);
    expect((img as HTMLImageElement).getAttribute('src')).toBe('./assets/svgs/light_bulb_off.svg');
  });


});
