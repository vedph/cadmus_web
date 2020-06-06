'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">cadmus documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Datation.html" data-type="entity-link">Datation</a>
                            </li>
                            <li class="link">
                                <a href="classes/HistoricalDate.html" data-type="entity-link">HistoricalDate</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordValidator.html" data-type="entity-link">PasswordValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/RomanNumber.html" data-type="entity-link">RomanNumber</a>
                            </li>
                            <li class="link">
                                <a href="classes/TextRange.html" data-type="entity-link">TextRange</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenLocation.html" data-type="entity-link">TokenLocation</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenPoint.html" data-type="entity-link">TokenPoint</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/EnvService.html" data-type="entity-link">EnvService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorService.html" data-type="entity-link">ErrorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GravatarService.html" data-type="entity-link">GravatarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JsonSchemaService.html" data-type="entity-link">JsonSchemaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LibraryRouteService.html" data-type="entity-link">LibraryRouteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link">LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TextLayerService.html" data-type="entity-link">TextLayerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilService.html" data-type="entity-link">UtilService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/PendingChangesGuard.html" data-type="entity-link">PendingChangesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ComponentCanDeactivate.html" data-type="entity-link">ComponentCanDeactivate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataPage.html" data-type="entity-link">DataPage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatationFormatOptions.html" data-type="entity-link">DatationFormatOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatationModel.html" data-type="entity-link">DatationModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorWrapper.html" data-type="entity-link">ErrorWrapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExistResult.html" data-type="entity-link">ExistResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetDefinition.html" data-type="entity-link">FacetDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FlagDefinition.html" data-type="entity-link">FlagDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Fragment.html" data-type="entity-link">Fragment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasVersion.html" data-type="entity-link">HasVersion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HistoricalDateModel.html" data-type="entity-link">HistoricalDateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Item.html" data-type="entity-link">Item</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemFilter.html" data-type="entity-link">ItemFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemInfo.html" data-type="entity-link">ItemInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayerHint.html" data-type="entity-link">LayerHint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayerPartInfo.html" data-type="entity-link">LayerPartInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginCredentials.html" data-type="entity-link">LoginCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResult.html" data-type="entity-link">LoginResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Part.html" data-type="entity-link">Part</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartDefinition.html" data-type="entity-link">PartDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartEditorKeys.html" data-type="entity-link">PartEditorKeys</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartGroup.html" data-type="entity-link">PartGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartGroupKey.html" data-type="entity-link">PartGroupKey</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartTypeIds.html" data-type="entity-link">PartTypeIds</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PasswordChange.html" data-type="entity-link">PasswordChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistrationModel.html" data-type="entity-link">RegistrationModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectedRange.html" data-type="entity-link">SelectedRange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TextCoords.html" data-type="entity-link">TextCoords</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TextLayerPart.html" data-type="entity-link">TextLayerPart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThesauriSet.html" data-type="entity-link">ThesauriSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Thesaurus.html" data-type="entity-link">Thesaurus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThesaurusEntry.html" data-type="entity-link">ThesaurusEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThesaurusFilter.html" data-type="entity-link">ThesaurusFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenTextLayerLine.html" data-type="entity-link">TokenTextLayerLine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserFilter.html" data-type="entity-link">UserFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInfo.html" data-type="entity-link">UserInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidationResult.html" data-type="entity-link">ValidationResult</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});