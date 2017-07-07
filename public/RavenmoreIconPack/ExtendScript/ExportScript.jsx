    #target photoshop

/*
Export script for Ravenmore's Icon Pack
29.05.2017 by Krzysztof Dycha
 */

var exportFolder = "E:\\RavenmoreIconPack"

var idAction = stringIDToTypeID( "placedLayerEditContents" );	
var idDesc = new ActionDescriptor();


var documentReference = app.activeDocument;
var fileLocation = documentReference.path;
var layerCount = documentReference.layers.length;
var pngSaveOptions = new PNGSaveOptions();


//go through all layers (except the last two background layers)
    for (var i = 0; i< layerCount-2;i++){
        var fileName = documentReference.layers[i].name;
        fileName = fileName.toLowerCase();
        fileName = fileName.split(' ').join('_');
        var fileSaveLocation = new File(exportFolder+ "\\"+"512\\" +fileName);
        documentReference.activeLayer = documentReference.layers[i];
        
        executeAction(idAction, idDesc, DialogModes.NO);  //open smart object
        //resize smart object
        documentReference.saveAs(fileSaveLocation,pngSaveOptions,true,Extension.LOWERCASE);
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);  
    };

    for (var i = 0; i< layerCount-2;i++){
        var fileName = documentReference.layers[i].name;
        fileName = fileName.toLowerCase();
        fileName = fileName.split(' ').join('_');
        var fileSaveLocation = new File(exportFolder+ "\\"+"256\\" +fileName);
        documentReference.activeLayer = documentReference.layers[i];
        
        executeAction(idAction, idDesc, DialogModes.NO);  //open smart object
        app.doAction('ResizeTo256','Default'); 
        documentReference.saveAs(fileSaveLocation,pngSaveOptions,true,Extension.LOWERCASE);
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);  
    };

    for (var i = 0; i< layerCount-2;i++){
        var fileName = documentReference.layers[i].name;
        fileName = fileName.toLowerCase();
        fileName = fileName.split(' ').join('_');
        var fileSaveLocation = new File(exportFolder+ "\\"+"128\\" +fileName);
        documentReference.activeLayer = documentReference.layers[i];
        
        executeAction(idAction, idDesc, DialogModes.NO);  //open smart object
        app.doAction('ResizeTo128','Default'); 
        documentReference.saveAs(fileSaveLocation,pngSaveOptions,true,Extension.LOWERCASE);
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);  
    };

    for (var i = 0; i< layerCount-2;i++){
        var fileName = documentReference.layers[i].name;
        fileName = fileName.toLowerCase();
        fileName = fileName.split(' ').join('_');
        var fileSaveLocation = new File(exportFolder+ "\\"+"64\\" +fileName);
        documentReference.activeLayer = documentReference.layers[i];
        
        executeAction(idAction, idDesc, DialogModes.NO);  //open smart object
        app.doAction('ResizeTo64','Default'); 
        documentReference.saveAs(fileSaveLocation,pngSaveOptions,true,Extension.LOWERCASE);
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);  
    };