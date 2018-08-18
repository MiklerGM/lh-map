import {
  observable
} from 'mobx';

const langList = {
  Albanian: 0,
  Arabic: 0,
  Armenian: 0,
  Azerbaijani: 0,
  Belarusian: 0,
  Bosnian: 0,
  Bulgarian: 0,
  Catalan: 0,
  Croatian: 0,
  Czech: 0,
  Danish: 0,
  Dutch: 0,
  English: 0,
  Estonian: 0,
  Filipino: 0,
  Finnish: 0,
  French: 0,
  Georgian: 0,
  German: 0,
  Greek: 0,
  Heard: 0,
  Hebrew: 0,
  Hindi: 0,
  Hungarian: 0,
  Icelandic: 0,
  Indonesian: 0,
  Italian: 0,
  Japanese: 0,
  Khmer: 0,
  Korean: 0,
  Lao: 0,
  Latvian: 0,
  Lithuanian: 0,
  Malay: 0,
  Maltese: 0,
  Mandarin: 0,
  Norwegian: 0,
  Persian: 0,
  Polish: 0,
  Portuguese: 0,
  Romanian: 0,
  Russian: 0,
  Slovak: 0,
  Slovenian: 0,
  Spanish: 0,
  Swahili: 0,
  Swedish: 0,
  Thai: 0,
  Turkish: 0,
  Ukranian: 0,
  Vietnamese: 0
};

export default class DataModel {
  @observable data = langList;

  @observable langauges = [];

  @observable countries = [];
}
