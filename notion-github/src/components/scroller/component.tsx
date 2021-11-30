import React, { FunctionComponent } from "react";
import "./styles.scss";
import { getActiveTab } from "@src/utils";
import browser from "webextension-polyfill";

// Scripts to execute in current tab
function scrollTo(value: number) {
    window.scroll(0, value);
}
/**
 * Scroll to a point in the current tab
 * @param scrollValue The Y value to scroll to within the current active tab
 */
async function executeScript(scrollValue: number): Promise<void> {
    // Query for the active tab in the current window
    const activeTab = await getActiveTab();
    if (!activeTab) {
        return;
    }
    // Executes the script in the current tab
    await browser.scripting.executeScript({
        target: { tabId: activeTab.id! },
        func: scrollTo,
        args: [scrollValue],
    });
}

// // // //

export const Scroller: FunctionComponent = () => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <button
                    className="btn btn-block btn-outline-dark"
                    onClick={async () => await executeScript(0)}
                >
                    Scroll To Top
                </button>
                <button
                    className="btn btn-block btn-outline-dark"
                    onClick={async () => await executeScript(9999999)}
                >
                    Scroll To Bottom
                </button>
            </div>
        </div>
    );
};
