// Author: Tobias Feigel
// Version: 1.0
// License: Public Domain
// Name: Template for generation own Stellarium Script Workplaces
// Description: A template generated for the workshop at public observatory Hof at September, 28th 2019.
// Based on the work of Ingo Berg: https://beltoforion.de/ - Thank you, Ingo!

import { Helper } from "../Shared/Helper"
import { Strings, DictType } from "./Strings"

// Enter Coordinates of Location
var param_lat : number= 50.0;
var param_long : number= 12.0;
var location_name : string= "Zentraleuropa";

// Definitions for strings
var strings : DictType;

// Setup Stellarium as wanted
function setup() : void
{
    // Wait to work around #491 
    // (https://github.com/Stellarium/stellarium/issues?q=is%3Aissue+is%3Aclosed)
    core.wait(2);

    // Setup SolarSystem Objects
    SolarSystem.setFlagPlanets(false);
	SolarSystem.setFlagLabels(false);

    // Setup Constellations
    ConstellationMgr.setFlagLines(false);
    ConstellationMgr.setFlagLabels(false);
    ConstellationMgr.setFlagArt(false);
    ConstellationMgr.setFlagBoundaries(false);
    ConstellationMgr.setConstellationLineThickness(2);
    ConstellationMgr.setFontSize(24);
    ConstellationMgr.setFlagConstellationPick(true);
    ConstellationMgr.setFlagIsolateSelected(true);  

    // Setup Sporadic Meteors
    SporadicMeteorMgr.setFlagShow(true);
    SporadicMeteorMgr.setZHR(5000);

    // Setup other Display Options
    core.setSkyCulture("western");
    core.setGuiVisible(false);
    core.setMilkyWayVisible(true);
    core.setMilkyWayIntensity(3);

    // Setup Location
    core.setObserverLocation(param_long, param_lat, 950, 0, location_name, "Earth");

    // Setup Landscape
    LandscapeMgr.setFlagAtmosphere(true);
    
    // Setup Movement
    StelMovementMgr.setFlagEnableMouseNavigation(false);
    
    // Load localization Strings
    strings = new Strings().getLocalizedStrings("de_DE");
}

// Initialize Application
function initialize() : void
{
    core.setTimeRate(0);
    core.setDate("2019-01-01T00:00:00", "utc");

    let labelTitle = LabelMgr.labelScreen(strings.title, 250, 750, false, 70, "#66ccff");
    LabelMgr.setLabelShow(labelTitle, true);

    let labelSubTitle = LabelMgr.labelScreen(strings.subtitle, 250, 850, false, 40, "#66ccff");
    LabelMgr.setLabelShow(labelSubTitle, true);

    core.moveToAltAzi(20, 270);
    core.wait(5);
    LabelMgr.deleteAllLabels();
}

//
// Do the Work, which the Script should do for you in this function!
// If you are not sure what you are doing, only change this function!
//
function doWork() : void 
{

}

// 
// Try to undo script settings that will mess up stellariums expected opertation
//
function cleanup() : void
{
    ConstellationMgr.setFlagIsolateSelected(false);  
    ConstellationMgr.setFlagConstellationPick(false);
    ConstellationMgr.deselectConstellations();

    StelMovementMgr.setFlagEnableMouseNavigation(true);
	
    core.setGuiVisible(true);
    core.clear("natural");
}

//
// Main script entry Point
//
function main() : void
{
    try
    {
        //Helper.installDebugHooks();
        
        // Setup Stellarium
        setup()

        // Inititalize Stellarium
        initialize();

        // Do some work
        doWork();

        core.wait(3);
    }
    catch(exc)
    {
        core.output(exc);
        //Helper.showError(exc);
    }
    finally
    {
        cleanup();
        //Helper.removeDebugHooks();
    }
}

main();