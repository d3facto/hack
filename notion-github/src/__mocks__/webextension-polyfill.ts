// src/__mocks__/webextension-polyfill
// Update this file to include any mocks for the `webextension-polyfill` package
// This is used to mock these values for Storybook so you can develop your components
// outside the Web Extension environment provided by a compatible browser
const browser: any = {
    scripting: {
        async executeScript(options: ScriptOptions): Promise<void> {
            console.log("hello scripting.executeScript called");
            return;
        },
    },
    tabs: {
        async query(queryOptions: QueryOptions): Promise<unknown[]> {
            console.log("hello tabs.query called");
            return [];
        },
    },
};

export default browser;

interface QueryOptions {
    active?: boolean;
    currentWindow?: boolean;
}

interface ScriptOptions {
    target: {
        tabId: number;
    };
    func?(...args: any[]): any;
    args?: any[];
}
