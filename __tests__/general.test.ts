import General from "../ts/general";


describe("Tests the methods in the general class for correctness", () => {
    // creating a type of General.
    let general: General

    // set up DOM elements before each test runs
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="rooms">
                <div class="bedroom">
                <button class="light-switch">Switch</button>
                <p class="test">Bedroom</p>
                </div>
                <div class="walkway_&_corridor">
                <button class="light-switch">Switch</button>
                </div>
                <div class="guest_room">
                <button class="light-switch">Switch</button>
                </div>
                <div class="outdoor_lights">
                <button class="light-switch">Switch</button>
                </div>
                <div id="notification-container"></div>
                <div class="target">Original</div>
            </div>
            `;

        // creating a instance of the General class
        general = new General()
    })


    test("the selector method in general returns the right element", () => {
        const element = general.selector(".test")
        expect( element ).not.toBe( null )
        expect( element?.textContent ).toBe("Bedroom")
    })


    test('closestSelector() finds nested child inside ancestor', () => {
        const element = document.querySelector('.bedroom p')!;
        const result = general.closestSelector(element, '.rooms', 'p');
        expect(result?.textContent?.toLowerCase()).toBe('bedroom');
    });


    test('renderHTML() inserts HTML into a container', () => {
        const container = document.getElementById('notification-container')!;
        general.renderHTML('<p class="notice">Hi</p>', 'beforeend', container);
        expect(container.innerHTML).toContain('notice');
    });


    test('notification() returns HTML string', () => {
        const html = general.notification('Test message');
        expect(html).toContain('Test message');
        expect(html).toContain('notification');
    });

    
    test('displayNotification() renders notification to container', () => {
        const container = document.getElementById('notification-container')!;
        general.displayNotification('Hello world', 'beforeend', container);
        expect(container.innerHTML).toContain('Hello world');
    });


    test('removeNotification() removes element after timeout', () => {
        jest.useFakeTimers();
        const el = document.createElement('div');
        document.body.appendChild(el);
        general.removeNotification(el);
        jest.advanceTimersByTime(2000);
        expect(document.body.contains(el)).toBe(false);
        jest.useRealTimers();
    });


    test('toggleHidden() toggles hidden class', () => {
        const el = document.querySelector('.bedroom')!;
        general.toggleHidden(el);
        expect(el.classList.contains('hidden')).toBe(true);
        general.toggleHidden(el);
        expect(el.classList.contains('hidden')).toBe(false);
    });


    test('removeHidden() removes hidden class', () => {
        const el = document.querySelector('.bedroom')!;
        el.classList.add('hidden');
        general.removeHidden(el as HTMLElement);
        expect(el.classList.contains('hidden')).toBe(false);
    });


    test('addHidden() adds hidden class', () => {
        const el = document.querySelector('.bedroom')!;
        general.addHidden(el as HTMLElement);
        expect(el.classList.contains('hidden')).toBe(true);
    });


    test('updateMarkupValue() sets text content', () => {
        const el = document.querySelector('.target')!;
        general.updateMarkupValue(el, 'Updated!');
        expect(el.textContent).toBe('Updated!');
    });


    test('getWifi() returns wifi list', () => {
        const wifiList = general.getWifi();
        expect(Array.isArray(wifiList)).toBe(true);
        expect(wifiList.length).toBeGreaterThan(0);
    });


    test('getComponent() returns correct component by name', () => {
        const component = general.getComponent('bedroom');
        expect(component?.name).toBe('bedroom');
        expect(component?.numOfLights).toBe(3);
    });


    test('getSelectedComponentName() returns component name', () => {
        const element = document.querySelector('.bedroom p')!;
        const name = general.getSelectedComponentName(element);
        expect(name).toBe('bedroom');
    });


    test('getComponentData() returns data object from element', () => {
        const element = document.querySelector('.bedroom p')!;
        const data = general.getComponentData(element as HTMLElement, '.rooms', 'p');
        expect(data?.name).toBe('bedroom');
    });

    test('handleLightIntensity() applies brightness style', () => {
        const element = document.querySelector('.bedroom') as HTMLElement;
        general.handleLightIntensity(element, 0.6);
        expect(element.style.filter).toBe('brightness(0.6)');
    });


    test('setComponentElement() assigns .element if not already set', () => {
        const room = general.getComponent('bedroom')!;
        expect(room.element).toBeUndefined();
        general.setComponentElement(room);
        expect(room.element).toBeInstanceOf(HTMLElement);
        expect((room.element as HTMLElement).classList.contains('light-switch')).toBe(true);
    });

})