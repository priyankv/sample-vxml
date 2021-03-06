var RegisterController = function(metadata) {
    var metadata = metadata;
    var fieldCounter = 0;
    var records = [];
    var fields = ["designation", "name", "district", "block", "panchayat"];

    this.nextField = function() {
        return fields[fieldCounter];
    };

    this.capture = function(record) {
        records[fieldCounter] = record;
        fieldCounter++;
    };

    this.allCaptured = function() {
        return fieldCounter >= fields.length;
    };

    this.playPrompt = function(field) {
        return metadata["audio.url"] + metadata['register.audio.url'] + metadata["register." + field + ".say"];
    };

    this.playBeep = function(field) {
        return metadata["audio.url"] +metadata['register.audio.url']+ metadata['registration.beep.audio'] ;
    };

    this.playConfirmPrompt = function(field) {
        return metadata["audio.url"] + metadata['register.audio.url'] + metadata["register." + field + ".confirm"];
    };

    this.playNoInputPrompt = function(field) {
        return metadata["audio.url"] + metadata['register.audio.url'] + metadata["register." + field + ".noinput"];
    };

    this.playRerecordPrompt = function(field) {
        return metadata["audio.url"] + metadata['register.audio.url'] + metadata["register." + field + ".rerecord"];
    };

    this.playRegistrationDone = function(field) {
        return metadata["audio.url"] + metadata['register.audio.url'] + metadata['register.complete'];
    };

    this.isVoiceRecognised = function(field) {
        return field != "name" && field != "designation";
    };

    this.submitUrl = function() {
        return metadata["web.url"] + "/flw/register/";
    };

    this.submitNameUrl = function() {
        return metadata["web.url"] + "/flw/record/name/";
    };

    this.nextFlow = function(calledNumber) {
        if (metadata["certificatecourse.application.number"] == calledNumber)
            return metadata["web.url"] + "/vxml/flwcc.vxml";
        else
            return metadata["web.url"] + "/vxml/jobaid.vxml";
    };

    this.getGrammar = function(field) {
        if (field == 'district')
            return metadata["grammar.url"] + metadata["grammar.title.district"] + ".grxml";
        else
            return metadata["grammar.url"] + metadata["grammar.title." + field] + records[fieldCounter - 1] + ".grxml";
    };

    this.playBack = function(record) {
        return metadata["audio.url"]  + metadata['location.audio.url']+ record + ".wav";
    };

    this.playBackPrompt = function(field,record) {
        if(this.isVoiceRecognised(field))
            return this.playBack(record);
        else
           return record;
        };

    this.designation = function() {
        return records[0];
    };

    this.name = function() {
        return records[1];
    };

    this.district = function() {
        return records[2];
    };

    this.block = function() {
        return records[3];
    };

    this.panchayat = function() {
        return records[4];
    };
};
