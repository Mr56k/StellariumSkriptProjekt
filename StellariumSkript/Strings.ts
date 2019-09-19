// Creates a class for creating the german texts for this script

export type DictType = { [key: string]: string };

export class Strings {
    private _german : DictType = {
        title:    "Sternbilder des Herbstes",
        subtitle: "Himmel über Sachsen",
    };

    private _english : DictType = {
        title:    "Constellations of the Autumn Sky",
        subtitle: "Northern Hemispehere",
    };    

    public getLocalizedStrings(loc : string = "") : DictType {

        // This function is using the localized name of the sun in order to try to determine the UI culture.
        let lang;
        if (loc)
        {
            lang = loc;
            core.debug('Forcing language to "' + lang + '"');            
        }
        else
        {
            lang = core.getAppLanguage();
            core.debug('App language is "' + lang + '"');
        }
    
        let s : any;

        // Germany, Austria and Switzerland get the german strings. 		
        if (lang == "de_DE" || lang == "de_AT" || lang == "de_CH") {
            s = this._german; 
        }
        // default is english
        else {
            s = this._english; 
        }
    
        return s;
    }
}