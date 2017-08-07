import {Injectable} from '@angular/core';

@Injectable()
export class Validator {
    /**
     * Validation strategies
     */
    private strategies;
    private templates;

    constructor() {
        this.templates = [
                {
                    type: 'blockType1',
                    title: {
                        key: '',
                        value: ''
                    },
                    description: {
                        key: '',
                        value: ''
                    }
                },
                {
                    type: 'blockType2',
                    title: {
                        key: '',
                        value: ''
                    },
                    description: {
                        key: '',
                        options: [
                            {
                                title: '',
                                value: ''
                            }
                        ]
                    }
                },
                {
                type: 'blockType3',
                title: {
                    key: '',
                    value: ''
                },
                description: {
                    key: '',
                    value: '',
                    options: [
                        {
                            title: '',
                            value: ''
                        }
                    ]
                }
            }
        ];
        this.strategies = {
            isInvalidSyntax: function(json) {
                try {
                    let obj = JSON.parse(json);
                } catch(ex) {
                    return true;
                }

                return false;
            },
            isInvalidStructure: function(obj) {
                let hasInvalidStructure = function hasInvalidStructure(obj, template) {
                    let toString = Object.prototype.toString;
                    let properties = Object.keys(obj);
                    let templateProperties = Object.keys(template);

                    if (properties.length === 0) {
  	                    return true;
                    }

                    if (Array.isArray(template)) {
  	                    return obj.some(function(item) {
    	                    return hasInvalidStructure(item, template[0]);
                        });
                    }

                    if (properties.length !== templateProperties.length) {
    	                return true;
                    }

                    return properties.some(function(property) {
                        if (templateProperties.indexOf(property) === -1) {
                            return true;
                        }
                        
                        if (toString.call(template[property]) !== toString.call(obj[property])) {
                            return true;
                        }
                        
                        if (property === 'type') {
                            if (template['type'] !== obj['type']) {
                                return true;
                            }
                        }

                        if (typeof template[property] === 'object') {
                            return hasInvalidStructure(obj[property], template[property]);
                        }
                    });
                };

                return this.templates.every((template) => {
                    return hasInvalidStructure(obj, template);
                });

            }.bind(this)
        };
    }
    validate(json) {
        if (this.strategies.isInvalidSyntax(json)) {
            return new Error('Please, check correction of syntax!');
        }
        
        let obj = JSON.parse(json);

        if (this.strategies.isInvalidStructure(obj)) {
           return new Error('Please, check correction of structure!');
        }

        return obj;
    }
}