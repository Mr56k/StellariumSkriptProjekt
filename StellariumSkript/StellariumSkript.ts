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

// Definitions for strings
var strings : DictType;

// Setup Stellarium as wanted
function setup() : void
{
    // Wait to work around #491 
    // (https://github.com/Stellarium/stellarium/issues?q=is%3Aissue+is%3Aclosed)
    core.wait(2);

    SolarSystem.setFlagPlanets(true);
    SolarSystem.setMoonScale(5);
    SolarSystem.setFlagMoonScale(false);
    SolarSystem.setFontSize(25);
    SolarSystem.setFlagTrails(false);
	SolarSystem.setFlagOrbits(false);
	SolarSystem.setFlagLabels(false);

    StarMgr.setFontSize(20);
    StarMgr.setLabelsAmount(0);

    StelMovementMgr.setAutoMoveDuration(5);

    ConstellationMgr.setFlagLines(false);
    ConstellationMgr.setFlagLabels(false);
    ConstellationMgr.setArtIntensity(0.0);
    ConstellationMgr.setFlagArt(false);
    ConstellationMgr.setFlagBoundaries(false);
    ConstellationMgr.setConstellationLineThickness(2);
    ConstellationMgr.setFontSize(32);
    ConstellationMgr.setFlagConstellationPick(true);
    ConstellationMgr.setFlagIsolateSelected(true);  

    SporadicMeteorMgr.setFlagShow(true);
    SporadicMeteorMgr.setZHR(5000);

    core.setSkyCulture("western");
    core.setGuiVisible(true);
    core.setMilkyWayVisible(true);
    core.setMilkyWayIntensity(4);
    core.setObserverLocation(param_long, param_lat, 950, 0, "Athos Centro Astronómico", "Earth");

    LandscapeMgr.setFlagAtmosphere(true);
    LandscapeMgr.setCurrentLandscapeName("Athos Centro Astronómico");
    LandscapeMgr.setFlagLandscapeUseMinimalBrightness(true);
	
    StelMovementMgr.setFlagEnableMouseNavigation(false);
    
    strings = new Strings().getLocalizedStrings("de_DE");
}


function intro() : void
{
    core.setTimeRate(0);
    core.setDate("2019-08-29T21:30:00", "utc");

    let labelTitle = LabelMgr.labelScreen(strings.title, 250, 750, false, 70, "#66ccff");
    LabelMgr.setLabelShow(labelTitle, true);

    let labelSubTitle = LabelMgr.labelScreen(strings.subtitle, 250, 850, false, 40, "#66ccff");
    LabelMgr.setLabelShow(labelSubTitle, true);

    core.moveToAltAzi(20, 270);

    GoHome(15, 0, 10);
    LabelMgr.deleteAllLabels();
}


function GoHome(delay : number, zoomDelay : number, moveDelay : number) : void
{
    core.output("Moving to home postion");
    StelMovementMgr.zoomTo(90, zoomDelay);
    core.moveToAltAzi(20, 175, moveDelay)
    core.wait(delay);
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
// Custom Actions for some constellations
//

function customActionPolaris() : void
{
    GridLinesMgr.setFlagEquatorGrid(true);
	StelMovementMgr.zoomTo(100,2);

    core.setTimeRate(2000); 
    core.wait(10);

    core.setTimeRate(60); 
    GridLinesMgr.setFlagEquatorGrid(false);
}


function customActionAndromeda() : void
{
	StelMovementMgr.zoomTo(3,2);
    core.wait(10);
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

        // Run Intro
        intro();

        //core.setTimeRate(60); 

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