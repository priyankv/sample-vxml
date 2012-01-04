var CallContext = function(course, metadata) {
    this.init = function(course, metadata) {
        //TODO: should we be validating course and metadata somehow?
        Course.buildLinks(course);
        this.course = course;
        this.currentInteraction = course;
        this.metadata = metadata;
    };

    this.handleInput = function(input) {
        if(input == 0) {
            this.currentInteraction = course;
        }
        else {
            this.goToChild(input);
        }
    };

    this.goToChild = function(childNumber) {
        this.currentInteraction = this.currentInteraction.children[childNumber - 1];
        return this;
    };

    this.isValidInput = function(childNumber) {
        return 0 <= childNumber && childNumber <= this.currentInteraction.children.length;
    };

    this.lessonFinished = function() {
        this.currentInteraction = this.currentInteraction.siblingOnRight.parent;
        return this;
    };

    this.isAtALesson = function() {
        return this.currentInteraction.data.lesson ? true : false;
    };

    this.currentInteractionIntroduction = function() {
        return this.audioFileBase() + this.currentInteraction.data.introduction;
    };

    this.currentInteractionMenu = function() {
        return this.audioFileBase() + this.currentInteraction.data.menu;
    };

    this.currentInteractionLesson = function() {
        return this.audioFileBase() + this.currentInteraction.data.lesson;
    };

    this.audioFileBase = function() {
        return this.metadata.audioFileBase;
    };

    this.resetPromptCounts = function() {
        this.noInputCount = 0;
        this.invalidInputCount = 0;
    }

    this.init(course, metadata);
};