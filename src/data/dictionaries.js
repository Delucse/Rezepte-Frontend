import units from './units.json';
import aliments from './aliments.json';
import portions from './portions.json';

export const singularUnits = [
    {
        description: 'ohne Einheit',
        unit: ' ',
    },
    {
        description: 'Becher',
        unit: 'Becher',
        group: 'Gefäß',
    },
    {
        description: 'Dose',
        unit: 'Dose',
        group: 'Gefäß',
    },
    {
        description: 'Flasche',
        unit: 'Flasche',
        group: 'Gefäß',
    },
    {
        description: 'Glas',
        unit: 'Glas',
        group: 'Gefäß',
    },
    {
        description: 'Schnapsglas',
        unit: 'Schnapsglas',
        group: 'Gefäß',
    },
    {
        description: 'Tasse',
        unit: 'Tasse',
        group: 'Gefäß',
    },
    {
        description: 'g (Gramm)',
        unit: 'g',
        group: 'Masse',
    },
    {
        description: 'kg (Kilogramm)',
        unit: 'kg',
        group: 'Masse',
    },
    {
        description: 'mg (Milligramm)',
        unit: 'mg',
        group: 'Masse',
    },
    {
        description: 'Pfund',
        unit: 'Pfund',
        group: 'Masse',
    },
    {
        description: 'Bund',
        unit: 'Bund',
        group: 'Sonstiges',
    },
    {
        description: 'etwas',
        unit: 'etwas',
        group: 'Sonstiges',
    },
    {
        description: 'Päckchen',
        unit: 'Päckchen',
        group: 'Sonstiges',
    },
    {
        description: 'Packung',
        unit: 'Packung',
        group: 'Sonstiges',
    },
    {
        description: 'Prise',
        unit: 'Prise',
        group: 'Sonstiges',
    },
    {
        description: 'Scheibe',
        unit: 'Scheibe',
        group: 'Sonstiges',
    },
    {
        description: 'Stange',
        unit: 'Stange',
        group: 'Sonstiges',
    },
    {
        description: 'Stück',
        unit: 'Stück',
        group: 'Sonstiges',
    },
    {
        description: 'Tropfen',
        unit: 'Tropfen',
        group: 'Sonstiges',
    },
    {
        description: 'cl (Zentiliter)',
        unit: 'cl',
        group: 'Volumen',
    },
    {
        description: 'dl (Deziliter)',
        unit: 'dl',
        group: 'Volumen',
    },
    {
        description: 'EL (Esslöffel)',
        unit: 'EL',
        group: 'Volumen',
    },
    {
        description: 'EL, gehäuft (gehäufter Esslöffel)',
        unit: 'EL, gehäuft',
        group: 'Volumen',
    },
    {
        description: 'EL, gestrichen (gestrichener Esslöffel)',
        unit: 'EL, gestrichen',
        group: 'Volumen',
    },
    {
        description: 'l (Liter)',
        unit: 'l',
        group: 'Volumen',
    },
    {
        description: 'ml (Milliliter)',
        unit: 'ml',
        group: 'Volumen',
    },
    {
        description: 'Msp (Messerspitze)',
        unit: 'Msp',
        group: 'Volumen',
    },
    {
        description: 'Schuss',
        unit: 'Schuss',
        group: 'Volumen',
    },
    {
        description: 'Spritzer',
        unit: 'Spritzer',
        group: 'Volumen',
    },
    {
        description: 'TL (Teelöffel)',
        unit: 'TL',
        group: 'Volumen',
    },
    {
        description: 'TL, gehäuft (gehäufter Teelöffel)',
        unit: 'TL, gehäuft',
        group: 'Volumen',
    },
    {
        description: 'TL, gestrichen (gestrichener Teelöffel)',
        unit: 'TL, gestrichen',
        group: 'Volumen',
    },
];
const createSingularUnits = () => {
    console.log(
        'singularUnits',
        [{ description: 'ohne Einheit', unit: ' ' }].concat(
            units
                .map((unit) => {
                    return {
                        description: `${
                            unit.singular ? unit.singular : unit.plural
                        }${unit.information ? ` (${unit.information})` : ''}`,
                        unit: unit.singular ? unit.singular : unit.plural,
                        group: unit.group,
                    };
                })
                .sort(
                    (a, b) =>
                        a.group.localeCompare(b.group) ||
                        a.unit.localeCompare(b.unit)
                )
        )
    );
};

export const pluralUnits = [
    {
        description: 'ohne Einheit',
        unit: ' ',
    },
    {
        description: 'Becher',
        unit: 'Becher',
        group: 'Gefäß',
    },
    {
        description: 'Dosen',
        unit: 'Dosen',
        group: 'Gefäß',
    },
    {
        description: 'Flaschen',
        unit: 'Flaschen',
        group: 'Gefäß',
    },
    {
        description: 'Gläser',
        unit: 'Gläser',
        group: 'Gefäß',
    },
    {
        description: 'Schnapsgläser',
        unit: 'Schnapsgläser',
        group: 'Gefäß',
    },
    {
        description: 'Tassen',
        unit: 'Tassen',
        group: 'Gefäß',
    },
    {
        description: 'g (Gramm)',
        unit: 'g',
        group: 'Masse',
    },
    {
        description: 'kg (Kilogramm)',
        unit: 'kg',
        group: 'Masse',
    },
    {
        description: 'mg (Milligramm)',
        unit: 'mg',
        group: 'Masse',
    },
    {
        description: 'Pfund',
        unit: 'Pfund',
        group: 'Masse',
    },
    {
        description: 'Bünde',
        unit: 'Bünde',
        group: 'Sonstiges',
    },
    {
        description: 'etwas',
        unit: 'etwas',
        group: 'Sonstiges',
    },
    {
        description: 'Päckchen',
        unit: 'Päckchen',
        group: 'Sonstiges',
    },
    {
        description: 'Packungen',
        unit: 'Packungen',
        group: 'Sonstiges',
    },
    {
        description: 'Prisen',
        unit: 'Prisen',
        group: 'Sonstiges',
    },
    {
        description: 'Scheiben',
        unit: 'Scheiben',
        group: 'Sonstiges',
    },
    {
        description: 'Stangen',
        unit: 'Stangen',
        group: 'Sonstiges',
    },
    {
        description: 'Stücke',
        unit: 'Stücke',
        group: 'Sonstiges',
    },
    {
        description: 'Tropfen',
        unit: 'Tropfen',
        group: 'Sonstiges',
    },
    {
        description: 'cl (Zentiliter)',
        unit: 'cl',
        group: 'Volumen',
    },
    {
        description: 'dl (Deziliter)',
        unit: 'dl',
        group: 'Volumen',
    },
    {
        description: 'EL (Esslöffel)',
        unit: 'EL',
        group: 'Volumen',
    },
    {
        description: 'EL, gehäuft (gehäufter Esslöffel)',
        unit: 'EL, gehäuft',
        group: 'Volumen',
    },
    {
        description: 'EL, gestrichen (gestrichener Esslöffel)',
        unit: 'EL, gestrichen',
        group: 'Volumen',
    },
    {
        description: 'l (Liter)',
        unit: 'l',
        group: 'Volumen',
    },
    {
        description: 'ml (Milliliter)',
        unit: 'ml',
        group: 'Volumen',
    },
    {
        description: 'Msp (Messerspitze)',
        unit: 'Msp',
        group: 'Volumen',
    },
    {
        description: 'Schüsse',
        unit: 'Schüsse',
        group: 'Volumen',
    },
    {
        description: 'Spritzer',
        unit: 'Spritzer',
        group: 'Volumen',
    },
    {
        description: 'TL (Teelöffel)',
        unit: 'TL',
        group: 'Volumen',
    },
    {
        description: 'TL, gehäuft (gehäufter Teelöffel)',
        unit: 'TL, gehäuft',
        group: 'Volumen',
    },
    {
        description: 'TL, gestrichen (gestrichener Teelöffel)',
        unit: 'TL, gestrichen',
        group: 'Volumen',
    },
];
const createPluralUnits = () => {
    console.log(
        'pluralUnits',
        [{ description: 'ohne Einheit', unit: ' ' }].concat(
            units
                .map((unit) => {
                    return {
                        description: `${
                            unit.plural ? unit.plural : unit.singular
                        }${unit.information ? ` (${unit.information})` : ''}`,
                        unit: unit.plural ? unit.plural : unit.singular,
                        group: unit.group,
                    };
                })
                .sort(
                    (a, b) =>
                        a.group.localeCompare(b.group) ||
                        a.unit.localeCompare(b.unit)
                )
        )
    );
};

export const singularAliments = [
    {
        aliment: 'Amaretto',
        group: 'alkoholische Getränke',
    },
    {
        aliment: 'Eierlikör',
        group: 'alkoholische Getränke',
    },
    {
        aliment: 'Rotwein',
        group: 'alkoholische Getränke',
    },
    {
        aliment: 'Rum',
        group: 'alkoholische Getränke',
    },
    {
        aliment: 'Weinbrand',
        group: 'alkoholische Getränke',
    },
    {
        aliment: 'Weißwein',
        group: 'alkoholische Getränke',
    },
    {
        aliment: 'frische Bratwurst',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'gekochter Schinken',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Hühnerbrust',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Kassler',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Lachs',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'mageres Schweinefleisch',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'roher Schinken',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Speck',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Surimi',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Thunfisch',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Apfel',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Banane',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Blaubeere',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'gemischte Beeren',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Himbeere',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Kiwi',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Mandarine',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Olive',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Orange',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Orangensaft',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Orangenschale',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Zitrone',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Zitronensaft',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Zitronenschale',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Aubergine',
        group: 'Gemüse',
    },
    {
        aliment: 'Avocado',
        group: 'Gemüse',
    },
    {
        aliment: 'Erbse',
        group: 'Gemüse',
    },
    {
        aliment: 'Fenchel',
        group: 'Gemüse',
    },
    {
        aliment: 'Fleischtomate',
        group: 'Gemüse',
    },
    {
        aliment: 'Frühlingszwiebel',
        group: 'Gemüse',
    },
    {
        aliment: 'Gemüsezwiebel',
        group: 'Gemüse',
    },
    {
        aliment: 'geschälte Tomate',
        group: 'Gemüse',
    },
    {
        aliment: 'Gewürzgurke',
        group: 'Gemüse',
    },
    {
        aliment: 'Gurke',
        group: 'Gemüse',
    },
    {
        aliment: 'Hokkaidokürbis',
        group: 'Gemüse',
    },
    {
        aliment: 'Kirschtomate',
        group: 'Gemüse',
    },
    {
        aliment: 'Knoblauchzehe',
        group: 'Gemüse',
    },
    {
        aliment: 'Kürbis',
        group: 'Gemüse',
    },
    {
        aliment: 'Mais',
        group: 'Gemüse',
    },
    {
        aliment: 'Mangold',
        group: 'Gemüse',
    },
    {
        aliment: 'Möhre',
        group: 'Gemüse',
    },
    {
        aliment: 'Palmkohl',
        group: 'Gemüse',
    },
    {
        aliment: 'Paprikaschote',
        group: 'Gemüse',
    },
    {
        aliment: 'Patisson',
        group: 'Gemüse',
    },
    {
        aliment: 'Porree',
        group: 'Gemüse',
    },
    {
        aliment: 'Rote Bete',
        group: 'Gemüse',
    },
    {
        aliment: 'Spinat',
        group: 'Gemüse',
    },
    {
        aliment: 'Tomate',
        group: 'Gemüse',
    },
    {
        aliment: 'Zucchini',
        group: 'Gemüse',
    },
    {
        aliment: 'Zwiebel',
        group: 'Gemüse',
    },
    {
        aliment: 'Bandnudeln',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Brot',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Buchweizenmehl',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Cannelloni',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Haferflocken',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Milchreis',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Orechhiette',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Penne',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Pumpernickel',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Reis',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Semmel',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Tortellini',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Weizenmehl (405)',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Weizenmehl (550)',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Basilikum',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Essig',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Ingwer',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Lorbeerblatt',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Mayonnaise',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Meersalz',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Muskatnus',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Olivenöl',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Palmin',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Petersilie',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Rapsöl',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Salbei',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Salz',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Senf',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Sesamöl',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Sesamsaat',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Sojasauce',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Sonnenblumenöl',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Wasabi',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Weißweinessig',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Zimt',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Butter',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Buttermilch',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Dickmilch',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Ei',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Eigelb',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Eiweiß',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Emmentaler',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'fettarme Milch',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Frischkäse',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Gouda',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Joghurt',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Käse',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Magerquark',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Mascarpone',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Milch',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Mozzarella',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Parmesan',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Quark',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'saure Sahne',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Schafkäse',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Schlagsahne',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Schmand',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Vollmilch',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Espresso',
        group: 'nichtalkoholische Getränke',
    },
    {
        aliment: 'Fanta',
        group: 'nichtalkoholische Getränke',
    },
    {
        aliment: 'Kaffee',
        group: 'nichtalkoholische Getränke',
    },
    {
        aliment: 'lauwarmes Wasser',
        group: 'nichtalkoholische Getränke',
    },
    {
        aliment: 'Mineralwasser',
        group: 'nichtalkoholische Getränke',
    },
    {
        aliment: 'Backpulver',
        group: 'Sonstiges',
    },
    {
        aliment: 'getrockneter Seetang',
        group: 'Sonstiges',
    },
    {
        aliment: 'Hefe',
        group: 'Sonstiges',
    },
    {
        aliment: 'Natron',
        group: 'Sonstiges',
    },
    {
        aliment: 'Nori-Blatt',
        group: 'Sonstiges',
    },
    {
        aliment: 'Trockenhefe',
        group: 'Sonstiges',
    },
    {
        aliment: 'Backoblate',
        group: 'Süßwaren',
    },
    {
        aliment: 'Bittermandelaroma',
        group: 'Süßwaren',
    },
    {
        aliment: 'Butterkeks',
        group: 'Süßwaren',
    },
    {
        aliment: 'gemahlene Haselnüsse',
        group: 'Süßwaren',
    },
    {
        aliment: 'gemahlene Mandeln',
        group: 'Süßwaren',
    },
    {
        aliment: 'Hagelzucker',
        group: 'Süßwaren',
    },
    {
        aliment: 'Haselnuss',
        group: 'Süßwaren',
    },
    {
        aliment: 'Honig',
        group: 'Süßwaren',
    },
    {
        aliment: 'Kakaopulver',
        group: 'Süßwaren',
    },
    {
        aliment: 'klaren Tortenguss',
        group: 'Süßwaren',
    },
    {
        aliment: 'Löffelbiskuit',
        group: 'Süßwaren',
    },
    {
        aliment: 'Mandeln',
        group: 'Süßwaren',
    },
    {
        aliment: 'Marmelade',
        group: 'Süßwaren',
    },
    {
        aliment: 'Maronencreme',
        group: 'Süßwaren',
    },
    {
        aliment: 'Marzipan',
        group: 'Süßwaren',
    },
    {
        aliment: 'Puderzucker',
        group: 'Süßwaren',
    },
    {
        aliment: 'Rosine',
        group: 'Süßwaren',
    },
    {
        aliment: 'Sahnesteif',
        group: 'Süßwaren',
    },
    {
        aliment: 'Schokoladenpuddingpulver',
        group: 'Süßwaren',
    },
    {
        aliment: 'Vanillearoma',
        group: 'Süßwaren',
    },
    {
        aliment: 'Vanillepuddingpulver',
        group: 'Süßwaren',
    },
    {
        aliment: 'Vanilleschote',
        group: 'Süßwaren',
    },
    {
        aliment: 'Vanillezucker',
        group: 'Süßwaren',
    },
    {
        aliment: 'Vollmilch-Kuvertüre',
        group: 'Süßwaren',
    },
    {
        aliment: 'Vollmilchschokolade',
        group: 'Süßwaren',
    },
    {
        aliment: 'weiße Schokolade',
        group: 'Süßwaren',
    },
    {
        aliment: 'Zartbitter-Kuvertüre',
        group: 'Süßwaren',
    },
    {
        aliment: 'Zartbitterschokolade',
        group: 'Süßwaren',
    },
    {
        aliment: 'Zucker',
        group: 'Süßwaren',
    },
];
const createSingularAliments = () => {
    console.log(
        'singularAliments',
        aliments
            .map((aliment) => {
                return {
                    aliment: aliment.singular
                        ? aliment.singular
                        : aliment.plural,
                    group: aliment.group,
                };
            })
            .sort(
                (a, b) =>
                    a.group.localeCompare(b.group) ||
                    a.aliment.localeCompare(b.aliment)
            )
    );
};

export const pluralAliments = [
    {
        aliment: 'Amaretto',
        group: 'alkoholische Getränke',
    },
    {
        aliment: 'Eierlikör',
        group: 'alkoholische Getränke',
    },
    {
        aliment: 'Rotwein',
        group: 'alkoholische Getränke',
    },
    {
        aliment: 'Rum',
        group: 'alkoholische Getränke',
    },
    {
        aliment: 'Weinbrand',
        group: 'alkoholische Getränke',
    },
    {
        aliment: 'Weißwein',
        group: 'alkoholische Getränke',
    },
    {
        aliment: 'frische Bratwürste',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'gekochte Schinken',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Hühnerbrüste',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Kassler',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Lachse',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'mageres Schweinefleisch',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'rohe Schinken',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Speck',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Surimi',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Thunfische',
        group: 'Fleisch & Fisch',
    },
    {
        aliment: 'Äpfel',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Bananen',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Blaubeeren',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'gemischte Beeren',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Himbeeren',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Kiwis',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Mandarinen',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Oliven',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Orangen',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Orangensaft',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Orangenschale',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Zitronen',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Zitronensaft',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Zitronenschale',
        group: 'Früchte & Obst',
    },
    {
        aliment: 'Auberginen',
        group: 'Gemüse',
    },
    {
        aliment: 'Avocados',
        group: 'Gemüse',
    },
    {
        aliment: 'Erbsen',
        group: 'Gemüse',
    },
    {
        aliment: 'Fenchel',
        group: 'Gemüse',
    },
    {
        aliment: 'Fleischtomaten',
        group: 'Gemüse',
    },
    {
        aliment: 'Frühlingszwiebeln',
        group: 'Gemüse',
    },
    {
        aliment: 'Gemüsezwiebeln',
        group: 'Gemüse',
    },
    {
        aliment: 'geschälte Tomaten',
        group: 'Gemüse',
    },
    {
        aliment: 'Gewürzgurken',
        group: 'Gemüse',
    },
    {
        aliment: 'Gurken',
        group: 'Gemüse',
    },
    {
        aliment: 'Hokkaidokürbisse',
        group: 'Gemüse',
    },
    {
        aliment: 'Kirschtomaten',
        group: 'Gemüse',
    },
    {
        aliment: 'Knoblauchzehen',
        group: 'Gemüse',
    },
    {
        aliment: 'Kürbisse',
        group: 'Gemüse',
    },
    {
        aliment: 'Mais',
        group: 'Gemüse',
    },
    {
        aliment: 'Mangold',
        group: 'Gemüse',
    },
    {
        aliment: 'Möhren',
        group: 'Gemüse',
    },
    {
        aliment: 'Palmkohle',
        group: 'Gemüse',
    },
    {
        aliment: 'Paprikaschoten',
        group: 'Gemüse',
    },
    {
        aliment: 'Patissons',
        group: 'Gemüse',
    },
    {
        aliment: 'Porree',
        group: 'Gemüse',
    },
    {
        aliment: 'Rote Beten',
        group: 'Gemüse',
    },
    {
        aliment: 'Spinat',
        group: 'Gemüse',
    },
    {
        aliment: 'Tomaten',
        group: 'Gemüse',
    },
    {
        aliment: 'Zucchinis',
        group: 'Gemüse',
    },
    {
        aliment: 'Zwiebeln',
        group: 'Gemüse',
    },
    {
        aliment: 'Bandnudeln',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Brote',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Buchweizenmehl',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Cannelloni',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Haferflocken',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Milchreis',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Orechhiette',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Penne',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Pumpernickel',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Reis',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Semmel',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Tortellini',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Weizenmehl (405)',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Weizenmehl (550)',
        group: 'Getreide & Getreideerzeugnisse',
    },
    {
        aliment: 'Basilikum',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Essig',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Ingwer',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Lorbeerblätter',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Mayonnaise',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Meersalz',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Muskatnüsse',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Olivenöl',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Palmin',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Petersilie',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Rapsöl',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Salbei',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Salz',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Senf',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Sesamöl',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Sesamsaat',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Sojasauce',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Sonnenblumenöl',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Wasabi',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Weißweinessig',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Zimt',
        group: 'Gewürze, Öle & Fette',
    },
    {
        aliment: 'Butter',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Buttermilch',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Dickmilch',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Eier',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Eigelbe',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Eiweiße',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Emmentaler',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'fettarme Milch',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Frischkäse',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Gouda',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Joghurt',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Käse',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Magerquark',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Mascarpone',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Milch',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Mozzarella',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Parmesan',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Quark',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'saure Sahne',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Schafkäse',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Schlagsahne',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Schmand',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Vollmilch',
        group: 'Milchprodukte & Eier',
    },
    {
        aliment: 'Espressi',
        group: 'nichtalkoholische Getränke',
    },
    {
        aliment: 'Fanta',
        group: 'nichtalkoholische Getränke',
    },
    {
        aliment: 'Kaffee',
        group: 'nichtalkoholische Getränke',
    },
    {
        aliment: 'lauwarmes Wasser',
        group: 'nichtalkoholische Getränke',
    },
    {
        aliment: 'Mineralwasser',
        group: 'nichtalkoholische Getränke',
    },
    {
        aliment: 'Backpulver',
        group: 'Sonstiges',
    },
    {
        aliment: 'getrockneter Seetang',
        group: 'Sonstiges',
    },
    {
        aliment: 'Hefen',
        group: 'Sonstiges',
    },
    {
        aliment: 'Natron',
        group: 'Sonstiges',
    },
    {
        aliment: 'Nori-Blätter',
        group: 'Sonstiges',
    },
    {
        aliment: 'Trockenhefen',
        group: 'Sonstiges',
    },
    {
        aliment: 'Backoblaten',
        group: 'Süßwaren',
    },
    {
        aliment: 'Bittermandelaroma',
        group: 'Süßwaren',
    },
    {
        aliment: 'Butterkekse',
        group: 'Süßwaren',
    },
    {
        aliment: 'gemahlene Haselnüsse',
        group: 'Süßwaren',
    },
    {
        aliment: 'gemahlene Mandeln',
        group: 'Süßwaren',
    },
    {
        aliment: 'Hagelzucker',
        group: 'Süßwaren',
    },
    {
        aliment: 'Haselnüsse',
        group: 'Süßwaren',
    },
    {
        aliment: 'Honig',
        group: 'Süßwaren',
    },
    {
        aliment: 'Kakaopulver',
        group: 'Süßwaren',
    },
    {
        aliment: 'klaren Tortenguss',
        group: 'Süßwaren',
    },
    {
        aliment: 'Löffelbiskuits',
        group: 'Süßwaren',
    },
    {
        aliment: 'Mandeln',
        group: 'Süßwaren',
    },
    {
        aliment: 'Marmeladen',
        group: 'Süßwaren',
    },
    {
        aliment: 'Maronencreme',
        group: 'Süßwaren',
    },
    {
        aliment: 'Marzipan',
        group: 'Süßwaren',
    },
    {
        aliment: 'Puderzucker',
        group: 'Süßwaren',
    },
    {
        aliment: 'Rosinen',
        group: 'Süßwaren',
    },
    {
        aliment: 'Sahnesteif',
        group: 'Süßwaren',
    },
    {
        aliment: 'Schokoladenpuddingpulver',
        group: 'Süßwaren',
    },
    {
        aliment: 'Vanillearoma',
        group: 'Süßwaren',
    },
    {
        aliment: 'Vanillepuddingpulver',
        group: 'Süßwaren',
    },
    {
        aliment: 'Vanilleschoten',
        group: 'Süßwaren',
    },
    {
        aliment: 'Vanillezucker',
        group: 'Süßwaren',
    },
    {
        aliment: 'Vollmilch-Kuvertüre',
        group: 'Süßwaren',
    },
    {
        aliment: 'Vollmilchschokolade',
        group: 'Süßwaren',
    },
    {
        aliment: 'weiße Schokolade',
        group: 'Süßwaren',
    },
    {
        aliment: 'Zartbitter-Kuvertüre',
        group: 'Süßwaren',
    },
    {
        aliment: 'Zartbitterschokolade',
        group: 'Süßwaren',
    },
    {
        aliment: 'Zucker',
        group: 'Süßwaren',
    },
];
const createPluralAliments = () => {
    console.log(
        'pluralAliments',
        aliments
            .map((aliment) => {
                return {
                    aliment: aliment.plural ? aliment.plural : aliment.singular,
                    group: aliment.group,
                };
            })
            .sort(
                (a, b) =>
                    a.group.localeCompare(b.group) ||
                    a.aliment.localeCompare(b.aliment)
            )
    );
};

export const singularPortions = [
    {
        portion: 'Gramm',
        group: 'Masse',
    },
    {
        portion: 'Kilogramm',
        group: 'Masse',
    },
    {
        portion: 'Brot',
        group: 'Stückzahl',
    },
    {
        portion: 'Flasche',
        group: 'Stückzahl',
    },
    {
        portion: 'Glas',
        group: 'Stückzahl',
    },
    {
        portion: 'Keks',
        group: 'Stückzahl',
    },
    {
        portion: 'Pizza',
        group: 'Stückzahl',
    },
    {
        portion: 'Plätzchen',
        group: 'Stückzahl',
    },
    {
        portion: 'Rolle',
        group: 'Stückzahl',
    },
    {
        portion: 'Deziliter',
        group: 'Volumen',
    },
    {
        portion: 'Liter',
        group: 'Volumen',
    },
];
const createSingularPortions = () => {
    console.log(
        'singularPortions',
        portions
            .map((portion) => {
                return {
                    portion: portion.singular
                        ? portion.singular
                        : portion.plural,
                    group: portion.group,
                };
            })
            .sort(
                (a, b) =>
                    a.group.localeCompare(b.group) ||
                    a.portion.localeCompare(b.portion)
            )
    );
};

export const pluralPortions = [
    {
        portion: 'Gramm',
        group: 'Masse',
    },
    {
        portion: 'Kilogramm',
        group: 'Masse',
    },
    {
        portion: 'Brote',
        group: 'Stückzahl',
    },
    {
        portion: 'Flaschen',
        group: 'Stückzahl',
    },
    {
        portion: 'Gläser',
        group: 'Stückzahl',
    },
    {
        portion: 'Kekse',
        group: 'Stückzahl',
    },
    {
        portion: 'Pizzen',
        group: 'Stückzahl',
    },
    {
        portion: 'Plätzchen',
        group: 'Stückzahl',
    },
    {
        portion: 'Rollen',
        group: 'Stückzahl',
    },
    {
        portion: 'Deziliter',
        group: 'Volumen',
    },
    {
        portion: 'Liter',
        group: 'Volumen',
    },
];
const createPluralPortions = () => {
    console.log(
        'pluralPortions',
        portions
            .map((portion) => {
                return {
                    portion: portion.plural ? portion.plural : portion.singular,
                    group: portion.group,
                };
            })
            .sort(
                (a, b) =>
                    a.group.localeCompare(b.group) ||
                    a.portion.localeCompare(b.portion)
            )
    );
};

export const singularUnitsDictionary = {
    ' ': ' ',
    mg: 'mg',
    g: 'g',
    Pfund: 'Pfund',
    kg: 'kg',
    ml: 'ml',
    cl: 'cl',
    dl: 'dl',
    l: 'l',
    TL: 'TL',
    'TL, gestrichen': 'TL, gestrichen',
    'TL, gehäuft': 'TL, gehäuft',
    EL: 'EL',
    'EL, gestrichen': 'EL, gestrichen',
    'EL, gehäuft': 'EL, gehäuft',
    Msp: 'Msp',
    Schuss: 'Schüsse',
    Spritzer: 'Spritzer',
    Stück: 'Stücke',
    Tasse: 'Tassen',
    Dose: 'Dosen',
    Flasche: 'Flaschen',
    Becher: 'Becher',
    Glas: 'Gläser',
    Schnapsglas: 'Schnapsgläser',
    etwas: 'etwas',
    Tropfen: 'Tropfen',
    Prise: 'Prisen',
    Stange: 'Stangen',
    Packung: 'Packungen',
    Päckchen: 'Päckchen',
    Bund: 'Bünde',
    Scheibe: 'Scheiben',
};
export const pluralUnitsDictionary = {
    ' ': ' ',
    mg: 'mg',
    g: 'g',
    Pfund: 'Pfund',
    kg: 'kg',
    ml: 'ml',
    cl: 'cl',
    dl: 'dl',
    l: 'l',
    TL: 'TL',
    'TL, gestrichen': 'TL, gestrichen',
    'TL, gehäuft': 'TL, gehäuft',
    EL: 'EL',
    'EL, gestrichen': 'EL, gestrichen',
    'EL, gehäuft': 'EL, gehäuft',
    Msp: 'Msp',
    Schüsse: 'Schuss',
    Spritzer: 'Spritzer',
    Stücke: 'Stück',
    Tassen: 'Tasse',
    Dosen: 'Dose',
    Flaschen: 'Flasche',
    Becher: 'Becher',
    Gläser: 'Glas',
    Schnapsgläser: 'Schnapsglas',
    etwas: 'etwas',
    Tropfen: 'Tropfen',
    Prisen: 'Prise',
    Stangen: 'Stange',
    Packungen: 'Packung',
    Päckchen: 'Päckchen',
    Bünde: 'Bund',
    Scheiben: 'Scheibe',
};
const createUnitsDictionaries = () => {
    const singularUnitsDictionary = {};
    const pluralUnitsDictionary = {};
    units.forEach((unit) => {
        singularUnitsDictionary[unit.singular ? unit.singular : unit.plural] =
            unit.plural ? unit.plural : unit.singular;
        pluralUnitsDictionary[unit.plural ? unit.plural : unit.singular] =
            unit.singular ? unit.singular : unit.plural;
    });
    console.log('singularUnitsDictionary', singularUnitsDictionary);
    console.log('pluralUnitsDictionary', pluralUnitsDictionary);
};

export const singularAlimentsDictionary = {
    'lauwarmes Wasser': 'lauwarmes Wasser',
    Fanta: 'Fanta',
    Butter: 'Butter',
    Ei: 'Eier',
    Milch: 'Milch',
    'Weizenmehl (405)': 'Weizenmehl (405)',
    'Weizenmehl (550)': 'Weizenmehl (550)',
    Zucker: 'Zucker',
    Salz: 'Salz',
    Trockenhefe: 'Trockenhefen',
    Sesamsaat: 'Sesamsaat',
    Eierlikör: 'Eierlikör',
    Backpulver: 'Backpulver',
    Vanillezucker: 'Vanillezucker',
    Buchweizenmehl: 'Buchweizenmehl',
    Olivenöl: 'Olivenöl',
    Sonnenblumenöl: 'Sonnenblumenöl',
    Rapsöl: 'Rapsöl',
    Mascarpone: 'Mascarpone',
    Kaffee: 'Kaffee',
    Espresso: 'Espressi',
    Eigelb: 'Eigelbe',
    Eiweiß: 'Eiweiße',
    Puderzucker: 'Puderzucker',
    Amaretto: 'Amaretto',
    Löffelbiskuit: 'Löffelbiskuits',
    Kakaopulver: 'Kakaopulver',
    Zwiebel: 'Zwiebeln',
    Gemüsezwiebel: 'Gemüsezwiebeln',
    Frühlingszwiebel: 'Frühlingszwiebeln',
    Knoblauchzehe: 'Knoblauchzehen',
    Porree: 'Porree',
    Fenchel: 'Fenchel',
    Tomate: 'Tomaten',
    'geschälte Tomate': 'geschälte Tomaten',
    Paprikaschote: 'Paprikaschoten',
    Kirschtomate: 'Kirschtomaten',
    Mais: 'Mais',
    Fleischtomate: 'Fleischtomaten',
    Erbse: 'Erbsen',
    Gurke: 'Gurken',
    Möhre: 'Möhren',
    Avocado: 'Avocados',
    Zucchini: 'Zucchinis',
    'Rote Bete': 'Rote Beten',
    Aubergine: 'Auberginen',
    Patisson: 'Patissons',
    Kürbis: 'Kürbisse',
    Hokkaidokürbis: 'Hokkaidokürbisse',
    Spinat: 'Spinat',
    Palmkohl: 'Palmkohle',
    Mangold: 'Mangold',
    Kassler: 'Kassler',
    Thunfisch: 'Thunfische',
    Hühnerbrust: 'Hühnerbrüste',
    'roher Schinken': 'rohe Schinken',
    'mageres Schweinefleisch': 'mageres Schweinefleisch',
    'frische Bratwurst': 'frische Bratwürste',
    'gekochter Schinken': 'gekochte Schinken',
    Lachs: 'Lachse',
    Surimi: 'Surimi',
    Speck: 'Speck',
    Schlagsahne: 'Schlagsahne',
    Magerquark: 'Magerquark',
    Emmentaler: 'Emmentaler',
    'saure Sahne': 'saure Sahne',
    Schmand: 'Schmand',
    Parmesan: 'Parmesan',
    Mozzarella: 'Mozzarella',
    Frischkäse: 'Frischkäse',
    Schafkäse: 'Schafkäse',
    'fettarme Milch': 'fettarme Milch',
    Vollmilch: 'Vollmilch',
    Joghurt: 'Joghurt',
    Käse: 'Käse',
    Dickmilch: 'Dickmilch',
    Buttermilch: 'Buttermilch',
    Quark: 'Quark',
    Gouda: 'Gouda',
    Bandnudeln: 'Bandnudeln',
    Cannelloni: 'Cannelloni',
    Penne: 'Penne',
    Orechhiette: 'Orechhiette',
    Tortellini: 'Tortellini',
    Haferflocken: 'Haferflocken',
    Semmel: 'Semmel',
    Reis: 'Reis',
    Milchreis: 'Milchreis',
    Pumpernickel: 'Pumpernickel',
    Brot: 'Brote',
    Marmelade: 'Marmeladen',
    'gemahlene Haselnüsse': 'gemahlene Haselnüsse',
    'Vollmilch-Kuvertüre': 'Vollmilch-Kuvertüre',
    'Zartbitter-Kuvertüre': 'Zartbitter-Kuvertüre',
    Vanillepuddingpulver: 'Vanillepuddingpulver',
    Vollmilchschokolade: 'Vollmilchschokolade',
    Zartbitterschokolade: 'Zartbitterschokolade',
    'weiße Schokolade': 'weiße Schokolade',
    'klaren Tortenguss': 'klaren Tortenguss',
    Sahnesteif: 'Sahnesteif',
    Maronencreme: 'Maronencreme',
    Butterkeks: 'Butterkekse',
    Rosine: 'Rosinen',
    Bittermandelaroma: 'Bittermandelaroma',
    Marzipan: 'Marzipan',
    Schokoladenpuddingpulver: 'Schokoladenpuddingpulver',
    Vanilleschote: 'Vanilleschoten',
    Vanillearoma: 'Vanillearoma',
    'gemahlene Mandeln': 'gemahlene Mandeln',
    Backoblate: 'Backoblaten',
    Hefe: 'Hefen',
    Haselnuss: 'Haselnüsse',
    Hagelzucker: 'Hagelzucker',
    Mandeln: 'Mandeln',
    Honig: 'Honig',
    Zitronensaft: 'Zitronensaft',
    Zitronenschale: 'Zitronenschale',
    Zitrone: 'Zitronen',
    Mandarine: 'Mandarinen',
    'gemischte Beeren': 'gemischte Beeren',
    Orangensaft: 'Orangensaft',
    Orangenschale: 'Orangenschale',
    Orange: 'Orangen',
    Himbeere: 'Himbeeren',
    Banane: 'Bananen',
    Kiwi: 'Kiwis',
    Apfel: 'Äpfel',
    Blaubeere: 'Blaubeeren',
    Muskatnus: 'Muskatnüsse',
    Basilikum: 'Basilikum',
    Lorbeerblatt: 'Lorbeerblätter',
    Salbei: 'Salbei',
    Zimt: 'Zimt',
    Meersalz: 'Meersalz',
    Essig: 'Essig',
    Sesamöl: 'Sesamöl',
    Sojasauce: 'Sojasauce',
    Wasabi: 'Wasabi',
    Weißweinessig: 'Weißweinessig',
    Petersilie: 'Petersilie',
    Senf: 'Senf',
    Ingwer: 'Ingwer',
    Palmin: 'Palmin',
    Mayonnaise: 'Mayonnaise',
    Gewürzgurke: 'Gewürzgurken',
    Olive: 'Oliven',
    Rum: 'Rum',
    Weinbrand: 'Weinbrand',
    Rotwein: 'Rotwein',
    Weißwein: 'Weißwein',
    Mineralwasser: 'Mineralwasser',
    Natron: 'Natron',
    'getrockneter Seetang': 'getrockneter Seetang',
    'Nori-Blatt': 'Nori-Blätter',
};
export const pluralAlimentsDictionary = {
    'lauwarmes Wasser': 'lauwarmes Wasser',
    Fanta: 'Fanta',
    Butter: 'Butter',
    Eier: 'Ei',
    Milch: 'Milch',
    'Weizenmehl (405)': 'Weizenmehl (405)',
    'Weizenmehl (550)': 'Weizenmehl (550)',
    Zucker: 'Zucker',
    Salz: 'Salz',
    Trockenhefen: 'Trockenhefe',
    Sesamsaat: 'Sesamsaat',
    Eierlikör: 'Eierlikör',
    Backpulver: 'Backpulver',
    Vanillezucker: 'Vanillezucker',
    Buchweizenmehl: 'Buchweizenmehl',
    Olivenöl: 'Olivenöl',
    Sonnenblumenöl: 'Sonnenblumenöl',
    Rapsöl: 'Rapsöl',
    Mascarpone: 'Mascarpone',
    Kaffee: 'Kaffee',
    Espressi: 'Espresso',
    Eigelbe: 'Eigelb',
    Eiweiße: 'Eiweiß',
    Puderzucker: 'Puderzucker',
    Amaretto: 'Amaretto',
    Löffelbiskuits: 'Löffelbiskuit',
    Kakaopulver: 'Kakaopulver',
    Zwiebeln: 'Zwiebel',
    Gemüsezwiebeln: 'Gemüsezwiebel',
    Frühlingszwiebeln: 'Frühlingszwiebel',
    Knoblauchzehen: 'Knoblauchzehe',
    Porree: 'Porree',
    Fenchel: 'Fenchel',
    Tomaten: 'Tomate',
    'geschälte Tomaten': 'geschälte Tomate',
    Paprikaschoten: 'Paprikaschote',
    Kirschtomaten: 'Kirschtomate',
    Mais: 'Mais',
    Fleischtomaten: 'Fleischtomate',
    Erbsen: 'Erbse',
    Gurken: 'Gurke',
    Möhren: 'Möhre',
    Avocados: 'Avocado',
    Zucchinis: 'Zucchini',
    'Rote Beten': 'Rote Bete',
    Auberginen: 'Aubergine',
    Patissons: 'Patisson',
    Kürbisse: 'Kürbis',
    Hokkaidokürbisse: 'Hokkaidokürbis',
    Spinat: 'Spinat',
    Palmkohle: 'Palmkohl',
    Mangold: 'Mangold',
    Kassler: 'Kassler',
    Thunfische: 'Thunfisch',
    Hühnerbrüste: 'Hühnerbrust',
    'rohe Schinken': 'roher Schinken',
    'mageres Schweinefleisch': 'mageres Schweinefleisch',
    'frische Bratwürste': 'frische Bratwurst',
    'gekochte Schinken': 'gekochter Schinken',
    Lachse: 'Lachs',
    Surimi: 'Surimi',
    Speck: 'Speck',
    Schlagsahne: 'Schlagsahne',
    Magerquark: 'Magerquark',
    Emmentaler: 'Emmentaler',
    'saure Sahne': 'saure Sahne',
    Schmand: 'Schmand',
    Parmesan: 'Parmesan',
    Mozzarella: 'Mozzarella',
    Frischkäse: 'Frischkäse',
    Schafkäse: 'Schafkäse',
    'fettarme Milch': 'fettarme Milch',
    Vollmilch: 'Vollmilch',
    Joghurt: 'Joghurt',
    Käse: 'Käse',
    Dickmilch: 'Dickmilch',
    Buttermilch: 'Buttermilch',
    Quark: 'Quark',
    Gouda: 'Gouda',
    Bandnudeln: 'Bandnudeln',
    Cannelloni: 'Cannelloni',
    Penne: 'Penne',
    Orechhiette: 'Orechhiette',
    Tortellini: 'Tortellini',
    Haferflocken: 'Haferflocken',
    Semmel: 'Semmel',
    Reis: 'Reis',
    Milchreis: 'Milchreis',
    Pumpernickel: 'Pumpernickel',
    Brote: 'Brot',
    Marmeladen: 'Marmelade',
    'gemahlene Haselnüsse': 'gemahlene Haselnüsse',
    'Vollmilch-Kuvertüre': 'Vollmilch-Kuvertüre',
    'Zartbitter-Kuvertüre': 'Zartbitter-Kuvertüre',
    Vanillepuddingpulver: 'Vanillepuddingpulver',
    Vollmilchschokolade: 'Vollmilchschokolade',
    Zartbitterschokolade: 'Zartbitterschokolade',
    'weiße Schokolade': 'weiße Schokolade',
    'klaren Tortenguss': 'klaren Tortenguss',
    Sahnesteif: 'Sahnesteif',
    Maronencreme: 'Maronencreme',
    Butterkekse: 'Butterkeks',
    Rosinen: 'Rosine',
    Bittermandelaroma: 'Bittermandelaroma',
    Marzipan: 'Marzipan',
    Schokoladenpuddingpulver: 'Schokoladenpuddingpulver',
    Vanilleschoten: 'Vanilleschote',
    Vanillearoma: 'Vanillearoma',
    'gemahlene Mandeln': 'gemahlene Mandeln',
    Backoblaten: 'Backoblate',
    Hefen: 'Hefe',
    Haselnüsse: 'Haselnuss',
    Hagelzucker: 'Hagelzucker',
    Mandeln: 'Mandeln',
    Honig: 'Honig',
    Zitronensaft: 'Zitronensaft',
    Zitronenschale: 'Zitronenschale',
    Zitronen: 'Zitrone',
    Mandarinen: 'Mandarine',
    'gemischte Beeren': 'gemischte Beeren',
    Orangensaft: 'Orangensaft',
    Orangenschale: 'Orangenschale',
    Orangen: 'Orange',
    Himbeeren: 'Himbeere',
    Bananen: 'Banane',
    Kiwis: 'Kiwi',
    Äpfel: 'Apfel',
    Blaubeeren: 'Blaubeere',
    Muskatnüsse: 'Muskatnus',
    Basilikum: 'Basilikum',
    Lorbeerblätter: 'Lorbeerblatt',
    Salbei: 'Salbei',
    Zimt: 'Zimt',
    Meersalz: 'Meersalz',
    Essig: 'Essig',
    Sesamöl: 'Sesamöl',
    Sojasauce: 'Sojasauce',
    Wasabi: 'Wasabi',
    Weißweinessig: 'Weißweinessig',
    Petersilie: 'Petersilie',
    Senf: 'Senf',
    Ingwer: 'Ingwer',
    Palmin: 'Palmin',
    Mayonnaise: 'Mayonnaise',
    Gewürzgurken: 'Gewürzgurke',
    Oliven: 'Olive',
    Rum: 'Rum',
    Weinbrand: 'Weinbrand',
    Rotwein: 'Rotwein',
    Weißwein: 'Weißwein',
    Mineralwasser: 'Mineralwasser',
    Natron: 'Natron',
    'getrockneter Seetang': 'getrockneter Seetang',
    'Nori-Blätter': 'Nori-Blatt',
};
const createAlimentsDictionaries = () => {
    const singularAlimentsDictionary = {};
    const pluralAlimentsDictionary = {};
    aliments.forEach((aliment) => {
        singularAlimentsDictionary[
            aliment.singular ? aliment.singular : aliment.plural
        ] = aliment.plural ? aliment.plural : aliment.singular;
        pluralAlimentsDictionary[
            aliment.plural ? aliment.plural : aliment.singular
        ] = aliment.singular ? aliment.singular : aliment.plural;
    });
    console.log('singularAlimentsDictionary', singularAlimentsDictionary);
    console.log('pluralAlimentsDictionary', pluralAlimentsDictionary);
};

export const singularPortionsDictionary = {
    Pizza: 'Pizzen',
    Brot: 'Brote',
    Keks: 'Kekse',
    Plätzchen: 'Plätzchen',
    Flasche: 'Flaschen',
    Rolle: 'Rollen',
    Glas: 'Gläser',
    Gramm: 'Gramm',
    Kilogramm: 'Kilogramm',
    Deziliter: 'Deziliter',
    Liter: 'Liter',
};
export const pluralPortionsDictionary = {
    Pizzen: 'Pizza',
    Brote: 'Brot',
    Kekse: 'Keks',
    Plätzchen: 'Plätzchen',
    Flaschen: 'Flasche',
    Rollen: 'Rolle',
    Gläser: 'Glas',
    Gramm: 'Gramm',
    Kilogramm: 'Kilogramm',
    Deziliter: 'Deziliter',
    Liter: 'Liter',
};
const createPortionsDictionaries = () => {
    const singularPortionsDictionary = {};
    const pluralPortionsDictionary = {};
    portions.forEach((portion) => {
        singularPortionsDictionary[
            portion.singular ? portion.singular : portion.plural
        ] = portion.plural ? portion.plural : portion.singular;
        pluralPortionsDictionary[
            portion.plural ? portion.plural : portion.singular
        ] = portion.singular ? portion.singular : portion.plural;
    });
    console.log('singularPortionsDictionary', singularPortionsDictionary);
    console.log('pluralPortionsDictionary', pluralPortionsDictionary);
};

export const singularUnitsAlimentDictionary = {
    mg: 'plural',
    g: 'plural',
    Pfund: 'plural',
    kg: 'plural',
    ml: 'singular',
    cl: 'singular',
    dl: 'singular',
    l: 'singular',
    TL: 'singular',
    'TL, gestrichen': 'singular',
    'TL, gehäuft': 'singular',
    EL: 'singular',
    'EL, gestrichen': 'singular',
    'EL, gehäuft': 'singular',
    Msp: 'singular',
    Schuss: 'singular',
    Spritzer: 'singular',
    Stück: 'singular',
    Tasse: 'plural',
    Dose: 'plural',
    Flasche: 'singular',
    Becher: 'singular',
    Glas: 'plural',
    Schnapsglas: 'plural',
    etwas: 'singular',
    Tropfen: 'singular',
    Prise: 'singular',
    Stange: 'singular',
    Packung: 'singular',
    Päckchen: 'singular',
    Bund: 'plural',
    Scheibe: 'singular',
};
export const pluralUnitsAlimentDictionary = {
    mg: 'plural',
    g: 'plural',
    Pfund: 'plural',
    kg: 'plural',
    ml: 'singular',
    cl: 'singular',
    dl: 'singular',
    l: 'singular',
    TL: 'singular',
    'TL, gestrichen': 'singular',
    'TL, gehäuft': 'singular',
    EL: 'singular',
    'EL, gestrichen': 'singular',
    'EL, gehäuft': 'singular',
    Msp: 'singular',
    Schüsse: 'singular',
    Spritzer: 'singular',
    Stücke: 'singular',
    Tassen: 'plural',
    Dosen: 'plural',
    Flaschen: 'singular',
    Becher: 'singular',
    Gläser: 'plural',
    Schnapsgläser: 'plural',
    etwas: 'singular',
    Tropfen: 'singular',
    Prisen: 'singular',
    Stangen: 'singular',
    Packungen: 'singular',
    Päckchen: 'singular',
    Bünde: 'plural',
    Scheiben: 'singular',
};
const createAlimentDictionaries = () => {
    const singularUnitsAlimentDictionary = {};
    const pluralUnitsAlimentDictionary = {};
    units.forEach((unit) => {
        if (unit.aliment) {
            singularUnitsAlimentDictionary[
                unit.singular ? unit.singular : unit.plural
            ] = unit.aliment;
            pluralUnitsAlimentDictionary[
                unit.plural ? unit.plural : unit.singular
            ] = unit.aliment;
        }
    });
    console.log(
        'singularUnitsAlimentDictionary',
        singularUnitsAlimentDictionary
    );
    console.log('pluralUnitsAlimentDictionary', pluralUnitsAlimentDictionary);
};

export const singularInfoDictionary = {
    'lauwarmes Wasser': 'Wasser',
    Fanta: 'Fanta',
    Butter: 'Butter',
    Ei: 'Hühnerei',
    Milch: 'Kuhmilch',
    'Weizenmehl (405)': 'Mehl',
    'Weizenmehl (550)': 'Mehl',
    Zucker: 'Zucker',
    Salz: 'Salz',
    Trockenhefe: 'Backhefe',
    Sesamsaat: 'Sesam',
    Eierlikör: 'Eierlikör',
    Backpulver: 'Backpulver',
    Vanillezucker: 'Vanillin',
    Buchweizenmehl: 'Buchweizen',
    Olivenöl: 'Olivenöl',
    Sonnenblumenöl: 'Sonnenblumenöl',
    Rapsöl: 'Rapsöl',
    Mascarpone: 'Mascarpone',
    Kaffee: 'Kaffee',
    Espresso: 'Espresso',
    Eigelb: 'Eigelb',
    Eiweiß: 'Eiweiß',
    Puderzucker: 'Puderzucker',
    Amaretto: 'Amaretto',
    Löffelbiskuit: 'Löffelbiskuit',
    Kakaopulver: 'Kakaopulver',
    Zwiebel: 'Zwiebel',
    Gemüsezwiebel: 'Zwiebel',
    Frühlingszwiebel: 'Winterzwiebel',
    Knoblauchzehe: 'Knoblauch',
    Porree: 'Lauch',
    Fenchel: 'Fenchel',
    Tomate: 'Tomate',
    'geschälte Tomate': 'Tomate',
    Paprikaschote: 'Paprika',
    Kirschtomate: 'Tomate',
    Mais: 'Mais',
    Fleischtomate: 'Tomate',
    Erbse: 'Erbse',
    Gurke: 'Gurke',
    Möhre: 'Möhre',
    Avocado: 'Avocado',
    Zucchini: 'Zucchini',
    'Rote Bete': 'Rote Bete',
    Aubergine: 'Aubergine',
    Patisson: 'Patisson',
    Kürbis: 'Kürbis',
    Hokkaidokürbis: 'Hokkaidokürbis',
    Spinat: 'Spinat',
    Palmkohl: 'Palmkohl',
    Mangold: 'Mangold',
    Kassler: 'Kassler',
    Thunfisch: 'Thunfisch',
    Hühnerbrust: 'Hühnerbrust',
    'roher Schinken': 'Rohschinken',
    'mageres Schweinefleisch': 'Schweinefleisch',
    'frische Bratwurst': 'Bratwurst',
    'gekochter Schinken': 'Formfleisch',
    Lachs: 'Lachs',
    Surimi: 'Surimi',
    Speck: 'Speck',
    Schlagsahne: 'Schlagsahne',
    Magerquark: 'Magerquark',
    Emmentaler: 'Emmentaler',
    'saure Sahne': 'Rahm',
    Schmand: 'Schmand',
    Parmesan: 'Parmesan',
    Mozzarella: 'Mozzarella',
    Frischkäse: 'Frischkäse',
    Schafkäse: 'Schafkäse',
    'fettarme Milch': 'Milch',
    Vollmilch: 'Milch',
    Joghurt: 'Joghurt',
    Käse: 'Käse',
    Dickmilch: 'Dickmilch',
    Buttermilch: 'Buttermilch',
    Quark: 'Quark',
    Gouda: 'Gouda',
    Bandnudeln: 'Liste von Pastaformen',
    Cannelloni: 'Cannelloni',
    Penne: 'Liste von Pastaformen',
    Orechhiette: 'Liste von Pastaformen',
    Tortellini: 'Tortellini',
    Haferflocken: 'Haferflocken',
    Semmel: 'Semmel',
    Reis: 'Reis',
    Milchreis: 'Milchreis',
    Pumpernickel: 'Pumpernickel',
    Brot: 'Brot',
    Marmelade: 'Marmelade',
    'gemahlene Haselnüsse': 'Hasel',
    'Vollmilch-Kuvertüre': 'Kuvertüre',
    'Zartbitter-Kuvertüre': 'Kuvertüre',
    Vanillepuddingpulver: 'Pudding',
    Vollmilchschokolade: 'Milchschokolade',
    Zartbitterschokolade: 'Bitterschokolade',
    'weiße Schokolade': 'weiße Schokolade',
    'klaren Tortenguss': 'Tortenguss',
    Sahnesteif: 'Sahnestandmittel',
    Maronencreme: 'Maronencreme',
    Butterkeks: 'Keks',
    Rosine: 'Rosine',
    Bittermandelaroma: 'Backaroma',
    Marzipan: 'Marzipan',
    Schokoladenpuddingpulver: 'Pudding',
    Vanilleschote: 'Vanilleschote',
    Vanillearoma: 'Vanillearoma',
    'gemahlene Mandeln': 'Mandel',
    Backoblate: 'Oblate',
    Hefe: 'Hefe',
    Haselnuss: 'Gemeine Hasel',
    Hagelzucker: 'Zucker',
    Mandeln: 'Mandel',
    Honig: 'Honig',
    Zitronensaft: 'Zitrone',
    Zitronenschale: 'Zitrone',
    Zitrone: 'Zitrone',
    Mandarine: 'Mandarine',
    'gemischte Beeren': 'Beeren',
    Orangensaft: 'Orange',
    Orangenschale: 'Orange',
    Orange: 'Orange',
    Himbeere: 'Himbeere',
    Banane: 'Banane',
    Kiwi: 'Kiwi',
    Apfel: 'Apfel',
    Blaubeere: 'Heidelbeere',
    Muskatnus: 'Muskatnussbaum',
    Basilikum: 'Basilikum',
    Lorbeerblatt: 'Echter Lorbeer',
    Salbei: 'Salbei',
    Zimt: 'Zimt',
    Meersalz: 'Meersalz',
    Essig: 'Essig',
    Sesamöl: 'Sesamöl',
    Sojasauce: 'Sojasauce',
    Wasabi: 'Wasabi',
    Weißweinessig: 'Weißweinessig',
    Petersilie: 'Petersilie',
    Senf: 'Senf',
    Ingwer: 'Ingwer',
    Palmin: 'Palmin',
    Mayonnaise: 'Mayonnaise',
    Gewürzgurke: 'Gewürzgurke',
    Olive: 'Olive',
    Rum: 'Rum',
    Weinbrand: 'Weinbrand',
    Rotwein: 'Rotwein',
    Weißwein: 'Weißwein',
    Mineralwasser: 'Mineralwasser',
    Natron: 'Backnatron',
    'getrockneter Seetang': 'Seetang',
    'Nori-Blatt': 'Nori',
};
export const pluralInfoDictionary = {
    'lauwarmes Wasser': 'Wasser',
    Fanta: 'Fanta',
    Butter: 'Butter',
    Eier: 'Hühnerei',
    Milch: 'Kuhmilch',
    'Weizenmehl (405)': 'Mehl',
    'Weizenmehl (550)': 'Mehl',
    Zucker: 'Zucker',
    Salz: 'Salz',
    Trockenhefen: 'Backhefe',
    Sesamsaat: 'Sesam',
    Eierlikör: 'Eierlikör',
    Backpulver: 'Backpulver',
    Vanillezucker: 'Vanillin',
    Buchweizenmehl: 'Buchweizen',
    Olivenöl: 'Olivenöl',
    Sonnenblumenöl: 'Sonnenblumenöl',
    Rapsöl: 'Rapsöl',
    Mascarpone: 'Mascarpone',
    Kaffee: 'Kaffee',
    Espressi: 'Espresso',
    Eigelbe: 'Eigelb',
    Eiweiße: 'Eiweiß',
    Puderzucker: 'Puderzucker',
    Amaretto: 'Amaretto',
    Löffelbiskuits: 'Löffelbiskuit',
    Kakaopulver: 'Kakaopulver',
    Zwiebeln: 'Zwiebel',
    Gemüsezwiebeln: 'Zwiebel',
    Frühlingszwiebeln: 'Winterzwiebel',
    Knoblauchzehen: 'Knoblauch',
    Porree: 'Lauch',
    Fenchel: 'Fenchel',
    Tomaten: 'Tomate',
    'geschälte Tomaten': 'Tomate',
    Paprikaschoten: 'Paprika',
    Kirschtomaten: 'Tomate',
    Mais: 'Mais',
    Fleischtomaten: 'Tomate',
    Erbsen: 'Erbse',
    Gurken: 'Gurke',
    Möhren: 'Möhre',
    Avocados: 'Avocado',
    Zucchinis: 'Zucchini',
    'Rote Beten': 'Rote Bete',
    Auberginen: 'Aubergine',
    Patissons: 'Patisson',
    Kürbisse: 'Kürbis',
    Hokkaidokürbisse: 'Hokkaidokürbis',
    Spinat: 'Spinat',
    Palmkohle: 'Palmkohl',
    Mangold: 'Mangold',
    Kassler: 'Kassler',
    Thunfische: 'Thunfisch',
    Hühnerbrüste: 'Hühnerbrust',
    'rohe Schinken': 'Rohschinken',
    'mageres Schweinefleisch': 'Schweinefleisch',
    'frische Bratwürste': 'Bratwurst',
    'gekochte Schinken': 'Formfleisch',
    Lachse: 'Lachs',
    Surimi: 'Surimi',
    Speck: 'Speck',
    Schlagsahne: 'Schlagsahne',
    Magerquark: 'Magerquark',
    Emmentaler: 'Emmentaler',
    'saure Sahne': 'Rahm',
    Schmand: 'Schmand',
    Parmesan: 'Parmesan',
    Mozzarella: 'Mozzarella',
    Frischkäse: 'Frischkäse',
    Schafkäse: 'Schafkäse',
    'fettarme Milch': 'Milch',
    Vollmilch: 'Milch',
    Joghurt: 'Joghurt',
    Käse: 'Käse',
    Dickmilch: 'Dickmilch',
    Buttermilch: 'Buttermilch',
    Quark: 'Quark',
    Gouda: 'Gouda',
    Bandnudeln: 'Liste von Pastaformen',
    Cannelloni: 'Cannelloni',
    Penne: 'Liste von Pastaformen',
    Orechhiette: 'Liste von Pastaformen',
    Tortellini: 'Tortellini',
    Haferflocken: 'Haferflocken',
    Semmel: 'Semmel',
    Reis: 'Reis',
    Milchreis: 'Milchreis',
    Pumpernickel: 'Pumpernickel',
    Brote: 'Brot',
    Marmeladen: 'Marmelade',
    'gemahlene Haselnüsse': 'Hasel',
    'Vollmilch-Kuvertüre': 'Kuvertüre',
    'Zartbitter-Kuvertüre': 'Kuvertüre',
    Vanillepuddingpulver: 'Pudding',
    Vollmilchschokolade: 'Milchschokolade',
    Zartbitterschokolade: 'Bitterschokolade',
    'weiße Schokolade': 'weiße Schokolade',
    'klaren Tortenguss': 'Tortenguss',
    Sahnesteif: 'Sahnestandmittel',
    Maronencreme: 'Maronencreme',
    Butterkekse: 'Keks',
    Rosinen: 'Rosine',
    Bittermandelaroma: 'Backaroma',
    Marzipan: 'Marzipan',
    Schokoladenpuddingpulver: 'Pudding',
    Vanilleschoten: 'Vanilleschote',
    Vanillearoma: 'Vanillearoma',
    'gemahlene Mandeln': 'Mandel',
    Backoblaten: 'Oblate',
    Hefen: 'Hefe',
    Haselnüsse: 'Gemeine Hasel',
    Hagelzucker: 'Zucker',
    Mandeln: 'Mandel',
    Honig: 'Honig',
    Zitronensaft: 'Zitrone',
    Zitronenschale: 'Zitrone',
    Zitronen: 'Zitrone',
    Mandarinen: 'Mandarine',
    'gemischte Beeren': 'Beeren',
    Orangensaft: 'Orange',
    Orangenschale: 'Orange',
    Orangen: 'Orange',
    Himbeeren: 'Himbeere',
    Bananen: 'Banane',
    Kiwis: 'Kiwi',
    Äpfel: 'Apfel',
    Blaubeeren: 'Heidelbeere',
    Muskatnüsse: 'Muskatnussbaum',
    Basilikum: 'Basilikum',
    Lorbeerblätter: 'Echter Lorbeer',
    Salbei: 'Salbei',
    Zimt: 'Zimt',
    Meersalz: 'Meersalz',
    Essig: 'Essig',
    Sesamöl: 'Sesamöl',
    Sojasauce: 'Sojasauce',
    Wasabi: 'Wasabi',
    Weißweinessig: 'Weißweinessig',
    Petersilie: 'Petersilie',
    Senf: 'Senf',
    Ingwer: 'Ingwer',
    Palmin: 'Palmin',
    Mayonnaise: 'Mayonnaise',
    Gewürzgurken: 'Gewürzgurke',
    Oliven: 'Olive',
    Rum: 'Rum',
    Weinbrand: 'Weinbrand',
    Rotwein: 'Rotwein',
    Weißwein: 'Weißwein',
    Mineralwasser: 'Mineralwasser',
    Natron: 'Backnatron',
    'getrockneter Seetang': 'Seetang',
    'Nori-Blätter': 'Nori',
};
const createInfoDictionaries = () => {
    const singularInfoDictionary = {};
    const pluralInfoDictionary = {};
    aliments.forEach((aliment) => {
        singularInfoDictionary[
            aliment.singular ? aliment.singular : aliment.plural
        ] = aliment.information;
        pluralInfoDictionary[
            aliment.plural ? aliment.plural : aliment.singular
        ] = aliment.information;
    });
    console.log('singularInfoDictionary', singularInfoDictionary);
    console.log('pluralInfoDictionary', pluralInfoDictionary);
};

// eslint-disable-next-line
const createAllDictionaries = () => {
    createSingularUnits();
    createPluralUnits();
    createSingularAliments();
    createPluralAliments();
    createSingularPortions();
    createPluralPortions();
    createUnitsDictionaries();
    createAlimentsDictionaries();
    createPortionsDictionaries();
    createAlimentDictionaries();
    createInfoDictionaries();
};
// createAllDictionaries();
