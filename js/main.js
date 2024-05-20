document.addEventListener("DOMContentLoaded", () => {

  // also in local storage
  let guessedWordCount = 0;
  let availableSpace = 1;
  let guessedWords = [[]];

  // 0 is false, 1 is true
  let gameOver = 0;
  let typingDisabled = false;

  let d = new Date();
  let currentDate = d.toLocaleDateString('en-US');

  const words = {'3/24/2022': 'quaff', '3/25/2022': 'knife', '3/26/2022': 'draff', '3/27/2022': 'dolts', '3/28/2022': 'widow', '3/29/2022': 'bride', '3/30/2022': 'champ', '3/31/2022': 'sable', '4/1/2022': 'scout', '4/2/2022': 'apish', '4/3/2022': 'mourn', '4/4/2022': 'genoa', '4/5/2022': 'grubs', '4/6/2022': 'poets', '4/7/2022': 'alack', '4/8/2022': 'girth', '4/9/2022': 'latch', '4/10/2022': 'cyrus', '4/11/2022': 'brach', '4/12/2022': 'bless', '4/13/2022': 'wiles', '4/14/2022': 'wiser', '4/15/2022': 'chuck', '4/16/2022': 'lurks', '4/17/2022': 'singe', '4/18/2022': 'pocky', '4/19/2022': 'spirt', '4/20/2022': 'bonny', '4/21/2022': 'civil', '4/22/2022': 'sally', '4/23/2022': 'style', '4/24/2022': 'rushy', '4/25/2022': 'eater', '4/26/2022': 'geese', '4/27/2022': 'evils', '4/28/2022': 'giddy', '4/29/2022': 'saint', '4/30/2022': 'venus', '5/1/2022': 'gapes', '5/2/2022': 'blind', '5/3/2022': 'tevil', '5/4/2022': 'throe', '5/5/2022': 'acres', '5/6/2022': 'thorn', '5/7/2022': 'fable', '5/8/2022': 'rigol', '5/9/2022': 'deign', '5/10/2022': 'gaols', '5/11/2022': 'jests', '5/12/2022': 'palsy', '5/13/2022': 'avail', '5/14/2022': 'lunes', '5/15/2022': 'tinct', '5/16/2022': 'silva', '5/17/2022': 'prize', '5/18/2022': 'aspic', '5/19/2022': 'biddy', '5/20/2022': 'heath', '5/21/2022': 'cotus', '5/22/2022': 'guile', '5/23/2022': 'roses', '5/24/2022': 'haver', '5/25/2022': 'priam', '5/26/2022': 'galls', '5/27/2022': 'asker',
  '5/28/2022': 'psalm', '5/29/2022': 'testy', '5/30/2022': 'alien', '5/31/2022': 'guard', '6/1/2022': 'dusty', '6/2/2022': 'bugle', '6/3/2022': 'batty', '6/4/2022': 'munch', '6/5/2022': 'vigil', '6/6/2022': 'regan', '6/7/2022': 'hence', '6/8/2022': 'matin', '6/9/2022': 'dotes', '6/10/2022': 'frock', '6/11/2022': 'atone', '6/12/2022': 'wight', '6/13/2022': 'riots', '6/14/2022': 'honey', '6/15/2022': 'edgar', '6/16/2022': 'charm', '6/17/2022': 'milch', '6/18/2022': 'fates', '6/19/2022': 'osric', '6/20/2022': 'oaten', '6/21/2022': 'overt', '6/22/2022': 'afore', '6/23/2022': 'cozen', '6/24/2022': 'sooty', '6/25/2022': 'swoon', '6/26/2022': 'seamy', '6/27/2022': 'shoon', '6/28/2022': 'troop', '6/29/2022': 'tench', '6/30/2022': 'alarm', '7/1/2022': 'circa', '7/2/2022': 'pined', '7/3/2022': 'stabs', '7/4/2022': 'wreck', '7/5/2022': 'usest', '7/6/2022': 'fools', '7/7/2022': 'capon', '7/8/2022': 'juice', '7/9/2022': 'amply', '7/10/2022': 'bedew', '7/11/2022': 'dusky', '7/12/2022': 'pious', '7/13/2022': 'thine', '7/14/2022': 'lodge', '7/15/2022': 'twink', '7/16/2022': 'gored', '7/17/2022': 'vaunt', '7/18/2022': 'ruffs', '7/19/2022': 'endue', '7/20/2022': 'prain', '7/21/2022': 'felon', '7/22/2022': 'petar', '7/23/2022': 'allay', '7/24/2022': 'erred', '7/25/2022': 'minos', '7/26/2022': 'stalk', '7/27/2022': 'lieth', '7/28/2022': 'dutch', '7/29/2022': 'filch', '7/30/2022': 'odour', '7/31/2022': 'smote', '8/1/2022': 'shaft',
  '8/2/2022': 'balmy', '8/3/2022': 'bliss', '8/4/2022': 'italy', '8/5/2022': 'minim', '8/6/2022': 'spies', '8/7/2022': 'massy', '8/8/2022': 'spilt', '8/9/2022': 'quean', '8/10/2022': 'dared', '8/11/2022': 'corky', '8/12/2022': 'chape', '8/13/2022': 'pence', '8/14/2022': 'forge', '8/15/2022': 'greed', '8/16/2022': 'rived', '8/17/2022': 'liver', '8/18/2022': 'lapis', '8/19/2022': 'egypt', '8/20/2022': 'taper', '8/21/2022': 'hater', '8/22/2022': 'crawl', '8/23/2022': 'moors', '8/24/2022': 'shake', '8/25/2022': 'bards', '8/26/2022': 'trots', '8/27/2022': 'folio', '8/28/2022': 'wands', '8/29/2022': 'waned', '8/30/2022': 'pupil', '8/31/2022': 'jutty', '9/1/2022': 'patay', '9/2/2022': 'leman', '9/3/2022': 'sibyl', '9/4/2022': 'turfy', '9/5/2022': 'melun', '9/6/2022': 'sorel', '9/7/2022': 'scene', '9/8/2022': 'gnawn', '9/9/2022': 'lurch', '9/10/2022': 'drink', '9/11/2022': 'hewgh', '9/12/2022': 'waver', '9/13/2022': 'beast', '9/14/2022': 'goths', '9/15/2022': 'chide', '9/16/2022': 'weary', '9/17/2022': 'toged', '9/18/2022': 'ducat', '9/19/2022': 'bonds', '9/20/2022': 'naked', '9/21/2022': 'slash', '9/22/2022': 'dumbe', '9/23/2022': 'savoy', '9/24/2022': 'chaps', '9/25/2022': 'tombs', '9/26/2022': 'privy', '9/27/2022': 'eased', '9/28/2022': 'duchy', '9/29/2022': 'goeth', '9/30/2022': 'timon', '10/1/2022': 'breed', '10/2/2022': 'shame', '10/3/2022': 'gauge', '10/4/2022': 'nymph', '10/5/2022': 'romeo', '10/6/2022': 'quest',
  '10/7/2022': 'bully', '10/8/2022': 'flute', '10/9/2022': 'swart', '10/10/2022': 'maund', '10/11/2022': 'tarre', '10/12/2022': 'clout', '10/13/2022': 'bawdy', '10/14/2022': 'boors', '10/15/2022': 'leaky', '10/16/2022': 'peach', '10/17/2022': 'veins', '10/18/2022': 'swarm', '10/19/2022': 'lards', '10/20/2022': 'garde', '10/21/2022': 'hoise', '10/22/2022': 'weedy', '10/23/2022': 'helen', '10/24/2022': 'guise', '10/25/2022': 'arise', '10/26/2022': 'bleak', '10/27/2022': 'reeky', '10/28/2022': 'silly', '10/29/2022': 'blots', '10/30/2022': 'fiend', '10/31/2022': 'coact', '11/1/2022': 'curse', '11/2/2022': 'chary', '11/3/2022': 'holly', '11/4/2022': 'canon', '11/5/2022': 'gests', '11/6/2022': 'cured', '11/7/2022': 'cupid', '11/8/2022': 'whoop', '11/9/2022': 'slily', '11/10/2022': 'limed', '11/11/2022': 'heave', '11/12/2022': 'slops', '11/13/2022': 'yield', '11/14/2022': 'spake', '11/15/2022': 'faith', '11/16/2022': 'diest', '11/17/2022': 'clime', '11/18/2022': 'shoes', '11/19/2022': 'gravy', '11/20/2022': 'rages', '11/21/2022': 'smack', '11/22/2022': 'curls', '11/23/2022': 'manly', '11/24/2022': 'crone', '11/25/2022': 'souse', '11/26/2022': 'amend', '11/27/2022': 'grate', '11/28/2022': 'cleft', '11/29/2022': 'frays', '11/30/2022': 'facit', '12/1/2022': 'bucks', '12/2/2022': 'roast', '12/3/2022': 'mince', '12/4/2022': 'scant', '12/5/2022': 'mares', '12/6/2022': 'marsh', '12/7/2022': 'acold', '12/8/2022': 'beams', '12/9/2022': 'whelp', '12/10/2022': 'dungy',
  '12/11/2022': 'bawds', '12/12/2022': 'vixen', '12/13/2022': 'corbo', '12/14/2022': 'betid', '12/15/2022': 'noble', '12/16/2022': 'demon', '12/17/2022': 'didst', '12/18/2022': 'snaky', '12/19/2022': 'potch', '12/20/2022': 'unfit', '12/21/2022': 'unset', '12/22/2022': 'night', '12/23/2022': 'frush', '12/24/2022': 'gibes', '12/25/2022': 'shipt', '12/26/2022': 'raves', '12/27/2022': 'shall', '12/28/2022': 'agues', '12/29/2022': 'pates', '12/30/2022': 'neeze', '12/31/2022': 'uncle', '1/1/2023': 'whore', '1/2/2023': 'razed', '1/3/2023': 'olden', '1/4/2023': 'thump', '1/5/2023': 'addle', '1/6/2023': 'agone', '1/7/2023': 'quoit', '1/8/2023': 'lusts', '1/9/2023': 'otter', '1/10/2023': 'vital', '1/11/2023': 'gnats', '1/12/2023': 'idles', '1/13/2023': 'hymen', '1/14/2023': 'kerns', '1/15/2023': 'spire', '1/16/2023': 'absey', '1/17/2023': 'clept', '1/18/2023': 'sated', '1/19/2023': 'chief', '1/20/2023': 'feign', '1/21/2023': 'dully', '1/22/2023': 'berod', '1/23/2023': 'canst', '1/24/2023': 'coral', '1/25/2023': 'trull', '1/26/2023': 'fusty', '1/27/2023': 'vexes', '1/28/2023': 'rogue', '1/29/2023': 'prief', '1/30/2023': 'owest', '1/31/2023': 'newts', '2/1/2023': 'lucre', '2/2/2023': 'purge', '2/3/2023': 'synod', '2/4/2023': 'pomps', '2/5/2023': 'clown', '2/6/2023': 'foxes', '2/7/2023': 'quern', '2/8/2023': 'wronk', '2/9/2023': 'plebs', '2/10/2023': 'scath', '2/11/2023': 'hillo', '2/12/2023': 'tunis', '2/13/2023': 'plots',
  '2/14/2023': 'agate', '2/15/2023': 'expel', '2/16/2023': 'titus', '2/17/2023': 'boast', '2/18/2023': 'ought', '2/19/2023': 'blows', '2/20/2023': 'hares', '2/21/2023': 'twits', '2/22/2023': 'magic', '2/23/2023': 'waxen', '2/24/2023': 'penny', '2/25/2023': 'sedge', '2/26/2023': 'grave', '2/27/2023': 'exton', '2/28/2023': 'laden', '3/1/2023': 'devil', '3/2/2023': 'smite', '3/3/2023': 'tithe', '3/4/2023': 'crost', '3/5/2023': 'janus', '3/6/2023': 'wormy', '3/7/2023': 'flesh', '3/8/2023': 'vizor', '3/9/2023': 'fitly', '3/10/2023': 'birch', '3/11/2023': 'fraud', '3/12/2023': 'court', '3/13/2023': 'wound', '3/14/2023': 'puppy', '3/15/2023': 'graff', '3/16/2023': 'argus', '3/17/2023': 'worst', '3/18/2023': 'slain', '3/19/2023': 'slime', '3/20/2023': 'groin', '3/21/2023': 'gripe', '3/22/2023': 'hadst', '3/23/2023': 'frown', '3/24/2023': 'wrath', '3/25/2023': 'ewers', '3/26/2023': 'tully', '3/27/2023': 'gazer', '3/28/2023': 'julia', '3/29/2023': 'surly', '3/30/2023': 'chafe', '3/31/2023': 'peize', '4/1/2023': 'honor', '4/2/2023': 'verse', '4/3/2023': 'groan', '4/4/2023': 'limbo', '4/5/2023': 'royal', '4/6/2023': 'colic', '4/7/2023': 'viper', '4/8/2023': 'leers', '4/9/2023': 'mercy', '4/10/2023': 'horns', '4/11/2023': 'flout', '4/12/2023': 'wring', '4/13/2023': 'pursy', '4/14/2023': 'diana', '4/15/2023': 'boyet', '4/16/2023': 'barge', '4/17/2023': 'aloft', '4/18/2023': 'husks', '4/19/2023': 'crisp', '4/20/2023': 'phebe',
  '4/21/2023': 'hound', '4/22/2023': 'amble', '4/23/2023': 'dropt', '4/24/2023': 'serge', '4/25/2023': 'assay', '4/26/2023': 'queen', '4/27/2023': 'twixt', '4/28/2023': 'medea', '4/29/2023': 'adieu', '4/30/2023': 'kings', '5/1/2023': 'riper', '5/2/2023': 'prime', '5/3/2023': 'wench', '5/4/2023': 'quilt', '5/5/2023': 'atomy', '5/6/2023': 'realm', '5/7/2023': 'brats', '5/8/2023': 'leeks', '5/9/2023': 'cesse', '5/10/2023': 'friar', '5/11/2023': 'durst', '5/12/2023': 'plums', '5/13/2023': 'swore', '5/14/2023': 'herbs', '5/15/2023': 'perdy', '5/16/2023': 'prone', '5/17/2023': 'vines', '5/18/2023': 'valor', '5/19/2023': 'sully', '5/20/2023': 'thane', '5/21/2023': 'rugby', '5/22/2023': 'edict', '5/23/2023': 'clipt', '5/24/2023': 'alias', '5/25/2023': 'scald', '5/26/2023': 'haunt', '5/27/2023': 'piety', '5/28/2023': 'stope', '5/29/2023': 'fanes', '5/30/2023': 'bessy', '5/31/2023': 'alike', '6/1/2023': 'dukes', '6/2/2023': 'fixed', '6/3/2023': 'snout', '6/4/2023': 'dower', '6/5/2023': 'excel', '6/6/2023': 'depth', '6/7/2023': 'pains', '6/8/2023': 'abysm', '6/9/2023': 'basan', '6/10/2023': 'lowly', '6/11/2023': 'botch', '6/12/2023': 'flail', '6/13/2023': 'curst', '6/14/2023': 'rough', '6/15/2023': 'drown', '6/16/2023': 'gawds', '6/17/2023': 'beget', '6/18/2023': 'sword', '6/19/2023': 'fated', '6/20/2023': 'paris', '6/21/2023': 'spurs', '6/22/2023': 'loins', '6/23/2023': 'chopt', '6/24/2023': 'elves', '6/25/2023': 'cloud',
  '6/26/2023': 'liest', '6/27/2023': 'surer', '6/28/2023': 'glend', '6/29/2023': 'quell', '6/30/2023': 'murky', '7/1/2023': 'stint', '7/2/2023': 'brand', '7/3/2023': 'lafeu', '7/4/2023': 'miser', '7/5/2023': 'primy', '7/6/2023': 'twere', '7/7/2023': 'fiery', '7/8/2023': 'exion', '7/9/2023': 'passy', '7/10/2023': 'mered', '7/11/2023': 'marry', '7/12/2023': 'alley', '7/13/2023': 'frank', '7/14/2023': 'nonce', '7/15/2023': 'sooth', '7/16/2023': 'avert', '7/17/2023': 'churn', '7/18/2023': 'sneak', '7/19/2023': 'skirr', '7/20/2023': 'cites', '7/21/2023': 'caper', '7/22/2023': 'drily', '7/23/2023': 'gross', '7/24/2023': 'brier', '7/25/2023': 'foist', '7/26/2023': 'stage', '7/27/2023': 'prick', '7/28/2023': 'leese', '7/29/2023': 'brute', '7/30/2023': 'monks', '7/31/2023': 'limbs', '8/1/2023': 'jelly', '8/2/2023': 'belie', '8/3/2023': 'chips', '8/4/2023': 'ariel', '8/5/2023': 'wares', '8/6/2023': 'inkle', '8/7/2023': 'cocks', '8/8/2023': 'jakes', '8/9/2023': 'unwed', '8/10/2023': 'madam', '8/11/2023': 'welsh', '8/12/2023': 'thyme', '8/13/2023': 'skein', '8/14/2023': 'rowel', '8/15/2023': 'vales', '8/16/2023': 'fling', '8/17/2023': 'onion', '8/18/2023': 'wince', '8/19/2023': 'truer', '8/20/2023': 'quake', '8/21/2023': 'satyr', '8/22/2023': 'crest', '8/23/2023': 'coins', '8/24/2023': 'navel', '8/25/2023': 'fumes', '8/26/2023': 'anvil', '8/27/2023': 'aside', '8/28/2023': 'truce', '8/29/2023': 'circe', '8/30/2023': 'bated',
  '8/31/2023': 'crave', '9/1/2023': 'stags', '9/2/2023': 'maxim', '9/3/2023': 'nooks', '9/4/2023': 'liege', '9/5/2023': 'trump', '9/6/2023': 'spout', '9/7/2023': 'sessa', '9/8/2023': 'cheek', '9/9/2023': 'aptly', '9/10/2023': 'cease', '9/11/2023': 'fowls', '9/12/2023': 'whipt', '9/13/2023': 'judas', '9/14/2023': 'enact', '9/15/2023': 'reaps', '9/16/2023': 'fenny', '9/17/2023': 'yorks', '9/18/2023': 'shalt', '9/19/2023': 'freer', '9/20/2023': 'raven', '9/21/2023': 'seize', '9/22/2023': 'credo', '9/23/2023': 'seest', '9/24/2023': 'haled', '9/25/2023': 'plead', '9/26/2023': 'tilth', '9/27/2023': 'exile', '9/28/2023': 'grace', '9/29/2023': 'arden', '9/30/2023': 'wooer', '10/1/2023': 'blaze', '10/2/2023': 'viand', '10/3/2023': 'groat', '10/4/2023': 'howls', '10/5/2023': 'pight', '10/6/2023': 'whine', '10/7/2023': 'quire', '10/8/2023': 'ilion', '10/9/2023': 'shire', '10/10/2023': 'frail', '10/11/2023': 'cruel', '10/12/2023': 'surge', '10/13/2023': 'breff', '10/14/2023': 'shine', '10/15/2023': 'laura', '10/16/2023': 'holla', '10/17/2023': 'mealy', '10/18/2023': 'youth', '10/19/2023': 'wales', '10/20/2023': 'hymns', '10/21/2023': 'bilbo', '10/22/2023': 'roman', '10/23/2023': 'adore', '10/24/2023': 'fecks', '10/25/2023': 'folks', '10/26/2023': 'rouse', '10/27/2023': 'sloth', '10/28/2023': 'heigh', '10/29/2023': 'yoked', '10/30/2023': 'papal', '10/31/2023': 'joyed', '11/1/2023': 'moult', '11/2/2023': 'unsay', '11/3/2023': 'moles', '11/4/2023': 'white',
  '11/5/2023': 'leper', '11/6/2023': 'quail', '11/7/2023': 'jolly', '11/8/2023': 'eisel', '11/9/2023': 'blood', '11/10/2023': 'viler', '11/11/2023': 'lydia', '11/12/2023': 'sneap', '11/13/2023': 'reave', '11/14/2023': 'broil', '11/15/2023': 'bacon', '11/16/2023': 'smart', '11/17/2023': 'sneck', '11/18/2023': 'hoots', '11/19/2023': 'flask', '11/20/2023': 'endow', '11/21/2023': 'gazes', '11/22/2023': 'unsex', '11/23/2023': 'feast', '11/24/2023': 'tempt', '11/25/2023': 'bavin', '11/26/2023': 'sprag', '11/27/2023': 'lulls', '11/28/2023': 'moist', '11/29/2023': 'rhyme', '11/30/2023': 'mount', '12/1/2023': 'gloze', '12/2/2023': 'deafs', '12/3/2023': 'deity', '12/4/2023': 'folly', '12/5/2023': 'forth', '12/6/2023': 'chine', '12/7/2023': 'beset', '12/8/2023': 'worms', '12/9/2023': 'loser', '12/10/2023': 'antic', '12/11/2023': 'bosko', '12/12/2023': 'sophy', '12/13/2023': 'loved', '12/14/2023': 'herod', '12/15/2023': 'bones', '12/16/2023': 'goest', '12/17/2023': 'hales', '12/18/2023': 'fares', '12/19/2023': 'caius', '12/20/2023': 'usury', '12/21/2023': 'swift', '12/22/2023': 'vomit', '12/23/2023': 'jewry', '12/24/2023': 'mopsa', '12/25/2023': 'baser', '12/26/2023': 'organ', '12/27/2023': 'death', '12/28/2023': 'parle', '12/29/2023': 'maids', '12/30/2023': 'stoop', '12/31/2023': 'julio', '1/1/2024': 'bosom', '1/2/2024': 'covet', '1/3/2024': 'bloat', '1/4/2024': 'bosky', '1/5/2024': 'sweno', '1/6/2024': 'caelo', '1/7/2024': 'oozes',
  '1/8/2024': 'bevel', '1/9/2024': 'scalp', '1/10/2024': 'shady', '1/11/2024': 'yesty', '1/12/2024': 'moral', '1/13/2024': 'hurly', '1/14/2024': 'prave', '1/15/2024': 'grief', '1/16/2024': 'bruit', '1/17/2024': 'jacet', '1/18/2024': 'haven', '1/19/2024': 'jades', '1/20/2024': 'tardy', '1/21/2024': 'resty', '1/22/2024': 'undid', '1/23/2024': 'brunt', '1/24/2024': 'nobly', '1/25/2024': 'dowdy', '1/26/2024': 'fagot', '1/27/2024': 'poesy', '1/28/2024': 'wived', '1/29/2024': 'wreak', '1/30/2024': 'extol', '1/31/2024': 'cinna', '2/1/2024': 'manka', '2/2/2024': 'unarm', '2/3/2024': 'fatal', '2/4/2024': 'routs', '2/5/2024': 'apace', '2/6/2024': 'creep', '2/7/2024': 'quill', '2/8/2024': 'quirk', '2/9/2024': 'hests', '2/10/2024': 'downy', '2/11/2024': 'unpin', '2/12/2024': 'rivet', '2/13/2024': 'sinew', '2/14/2024': 'hardy', '2/15/2024': 'snare', '2/16/2024': 'azure', '2/17/2024': 'lords', '2/18/2024': 'scabs', '2/19/2024': 'poise', '2/20/2024': 'doits', '2/21/2024': 'nevil', '2/22/2024': 'chink', '2/23/2024': 'swear', '2/24/2024': 'fleas', '2/25/2024': 'toaze', '2/26/2024': 'brave', '2/27/2024': 'gamut', '2/28/2024': 'barky', '3/1/2024': 'plods', '3/2/2024': 'prune', '3/3/2024': 'hoard', '3/4/2024': 'wafts', '3/5/2024': 'refts', '3/6/2024': 'bloom', '3/7/2024': 'stern', '3/8/2024': 'blush', '3/9/2024': 'gyves', '3/10/2024': 'knell', '3/11/2024': 'lofty', '3/12/2024': 'buxom', '3/13/2024': 'fight', '3/14/2024': 'creed',
  '3/15/2024': 'becks', '3/16/2024': 'nervy', '3/17/2024': 'manna', '3/18/2024': 'capet', '3/19/2024': 'knave', '3/20/2024': 'scots', '3/21/2024': 'winch', '3/22/2024': 'varro', '3/23/2024': 'sayst', '3/24/2024': 'scope', '3/25/2024': 'staid', '3/26/2024': 'sores', '3/27/2024': 'pasty', '3/28/2024': 'crare', '3/29/2024': 'argal', '3/30/2024': 'brawl', '3/31/2024': 'weeps', '4/1/2024': 'begin', '4/2/2024': 'lutes', '4/3/2024': 'abbey', '4/4/2024': 'peril', '4/5/2024': 'tawny', '4/6/2024': 'daisy', '4/7/2024': 'foils', '4/8/2024': 'purse', '4/9/2024': 'fount', '4/10/2024': 'sware', '4/11/2024': 'idiot', '4/12/2024': 'crown', '4/13/2024': 'elbow', '4/14/2024': 'claud', '4/15/2024': 'loath', '4/16/2024': 'swell', '4/17/2024': 'steed', '4/18/2024': 'gulls', '4/19/2024': 'moans', '4/20/2024': 'wrong', '4/21/2024': 'casts', '4/22/2024': 'drabs', '4/23/2024': 'doers', '4/24/2024': 'revel', '4/25/2024': 'strew', '4/26/2024': 'pearl', '4/27/2024': 'elder', '4/28/2024': 'dulls', '4/29/2024': 'wrung', '4/30/2024': 'wield', '5/1/2024': 'gaged', '5/2/2024': 'hopes', '5/3/2024': 'gaudy', '5/4/2024': 'jeshu', '5/5/2024': 'ruddy', '5/6/2024': 'baron', '5/7/2024': 'mayst', '5/8/2024': 'cakes', '5/9/2024': 'sever', '5/10/2024': 'bleat', '5/11/2024': 'rebel', '5/12/2024': 'shrew', '5/13/2024': 'ravel', '5/14/2024': 'ashes', '5/15/2024': 'fadge', '5/16/2024': 'bigot', '5/17/2024': 'dwell', '5/18/2024': 'ghost', '5/19/2024': 'river',
  '5/20/2024': 'reign', '5/21/2024': 'chaff', '5/22/2024': 'graft', '5/23/2024': 'syria', '5/24/2024': 'march', '5/25/2024': 'dirge', '5/26/2024': 'solus', '5/27/2024': 'tibey', '5/28/2024': 'afire', '5/29/2024': 'vicar', '5/30/2024': 'musty', '5/31/2024': 'linta', '6/1/2024': 'wooes', '6/2/2024': 'bodes', '6/3/2024': 'pluck', '6/4/2024': 'keech', '6/5/2024': 'foggy', '6/6/2024': 'boded', '6/7/2024': 'knock', '6/8/2024': 'peals', '6/9/2024': 'giber', '6/10/2024': 'helms', '6/11/2024': 'philo', '6/12/2024': 'viola', '6/13/2024': 'yokes', '6/14/2024': 'louse', '6/15/2024': 'quoth', '6/16/2024': 'knack', '6/17/2024': 'spain', '6/18/2024': 'cavil', '6/19/2024': 'quote', '6/20/2024': 'mangy', '6/21/2024': 'unapt', '6/22/2024': 'beard', '6/23/2024': 'choir', '6/24/2024': 'merit', '6/25/2024': 'masts', '6/26/2024': 'abase', '6/27/2024': 'grund', '6/28/2024': 'troth', '6/29/2024': 'feste', '6/30/2024': 'larks', '7/1/2024': 'siren', '7/2/2024': 'napes', '7/3/2024': 'pages', '7/4/2024': 'satan', '7/5/2024': 'ionia', '7/6/2024': 'dwelt', '7/7/2024': 'borne', '7/8/2024': 'churl', '7/9/2024': 'saith', '7/10/2024': 'vasty', '7/11/2024': 'dance', '7/12/2024': 'preys', '7/13/2024': 'besom', '7/14/2024': 'staff', '7/15/2024': 'flaky', '7/16/2024': 'wager', '7/17/2024': 'debts', '7/18/2024': 'smoke', '7/19/2024': 'licio', '7/20/2024': 'poppy', '7/21/2024': 'lusty', '7/22/2024': 'twire', '7/23/2024': 'jaded', '7/24/2024': 'carve', '7/25/2024': 'bouge',
  '7/26/2024': 'nerve', '7/27/2024': 'glove', '7/28/2024': 'evade', '7/29/2024': 'lated', '7/30/2024': 'oaken', '7/31/2024': 'ditty', '8/1/2024': 'amain', '8/2/2024': 'bushy', '8/3/2024': 'woful', '8/4/2024': 'trent', '8/5/2024': 'keels', '8/6/2024': 'whelm', '8/7/2024': 'essex', '8/8/2024': 'dream', '8/9/2024': 'regal', '8/10/2024': 'aries', '8/11/2024': 'decay', '8/12/2024': 'scrip', '8/13/2024': 'broad', '8/14/2024': 'gaunt', '8/15/2024': 'spear', '8/16/2024': 'fawns', '8/17/2024': 'earls', '8/18/2024': 'ousel', '8/19/2024': 'dowry', '8/20/2024': 'hinds', '8/21/2024': 'reeks', '8/22/2024': 'gazed', '8/23/2024': 'stile', '8/24/2024': 'snore', '8/25/2024': 'splay', '8/26/2024': 'lambs', '8/27/2024': 'meiny', '8/28/2024': 'argue', '8/29/2024': 'lucio', '8/30/2024': 'civet', '8/31/2024': 'fever', '9/1/2024': 'oared', '9/2/2024': 'shark', '9/3/2024': 'cribs', '9/4/2024': 'lance', '9/5/2024': 'titan', '9/6/2024': 'doves', '9/7/2024': 'peise', '9/8/2024': 'latin', '9/9/2024': 'pared', '9/10/2024': 'gruel', '9/11/2024': 'heirs', '9/12/2024': 'oaths', '9/13/2024': 'stark', '9/14/2024': 'snake', '9/15/2024': 'crook', '9/16/2024': 'gourd', '9/17/2024': 'havoc', '9/18/2024': 'brisk', '9/19/2024': 'taint', '9/20/2024': 'trash', '9/21/2024': 'tiber', '9/22/2024': 'gorge', '9/23/2024': 'stout', '9/24/2024': 'grind', '9/25/2024': 'stink', '9/26/2024': 'fruit', '9/27/2024': 'swain', '9/28/2024': 'haply', '9/29/2024': 'heart', '9/30/2024': 'dally',
  '10/1/2024': 'goads', '10/2/2024': 'abhor', '10/3/2024': 'jesus', '10/4/2024': 'whiff', '10/5/2024': 'scape', '10/6/2024': 'derby', '10/7/2024': 'taber', '10/8/2024': 'meeds', '10/9/2024': 'roted', '10/10/2024': 'witch', '10/11/2024': 'plash', '10/12/2024': 'venom', '10/13/2024': 'urine', '10/14/2024': 'swoln', '10/15/2024': 'humor', '10/16/2024': 'aspen', '10/17/2024': 'flora', '10/18/2024': 'rawly', '10/19/2024': 'bulls', '10/20/2024': 'sheaf', '10/21/2024': 'hoist', '10/22/2024': 'prate', '10/23/2024': 'butts', '10/24/2024': 'scoff', '10/25/2024': 'stoup', '10/26/2024': 'deeds', '10/27/2024': 'rites', '10/28/2024': 'frisk', '10/29/2024': 'birth', '10/30/2024': 'brood', '10/31/2024': 'ample', '11/1/2024': 'pless', '11/2/2024': 'broth', '11/3/2024': 'bough', '11/4/2024': 'unpay', '11/5/2024': 'gleek', '11/6/2024': 'auger', '11/7/2024': 'midst', '11/8/2024': 'cloys', '11/9/2024': 'percy', '11/10/2024': 'slake', '11/11/2024': 'heaps', '11/12/2024': 'menas', '11/13/2024': 'scaly', '11/14/2024': 'knead', '11/15/2024': 'offal', '11/16/2024': 'shade', '11/17/2024': 'wheer', '11/18/2024': 'jewel', '11/19/2024': 'loves', '11/20/2024': 'tubal', '11/21/2024': 'toils', '11/22/2024': 'oweth', '11/23/2024': 'chest', '11/24/2024': 'tract', '11/25/2024': 'slimy', '11/26/2024': 'drugs', '11/27/2024': 'siege', '11/28/2024': 'feith', '11/29/2024': 'hilts', '11/30/2024': 'wills', '12/1/2024': 'vapor', '12/2/2024': 'plump', '12/3/2024': 'thews',
  '12/4/2024': 'leapt', '12/5/2024': 'curry', '12/6/2024': 'glory', '12/7/2024': 'aches', '12/8/2024': 'croak', '12/9/2024': 'dregs', '12/10/2024': 'doubt', '12/11/2024': 'lazar', '12/12/2024': 'noddy', '12/13/2024': 'brock', '12/14/2024': 'muses', '12/15/2024': 'begot', '12/16/2024': 'dozed', '12/17/2024': 'awork', '12/18/2024': 'comet', '12/19/2024': 'arras', '12/20/2024': 'haste', '12/21/2024': 'wanes', '12/22/2024': 'heady', '12/23/2024': 'coted', '12/24/2024': 'loach', '12/25/2024': 'gnaws', '12/26/2024': 'pangs', '12/27/2024': 'lethe', '12/28/2024': 'tween', '12/29/2024': 'mores', '12/30/2024': 'feats', '12/31/2024': 'dolor', '1/1/2025': 'skull', '1/2/2025': 'leavy', '1/3/2025': 'scion', '1/4/2025': 'union', '1/5/2025': 'froth', '1/6/2025': 'shorn', '1/7/2025': 'arion', '1/8/2025': 'harry', '1/9/2025': 'coney', '1/10/2025': 'meads', '1/11/2025': 'twill', '1/12/2025': 'lolls', '1/13/2025': 'hotly', '1/14/2025': 'bandy', '1/15/2025': 'prest', '1/16/2025': 'tarry', '1/17/2025': 'agued', '1/18/2025': 'fasts', '1/19/2025': 'posse', '1/20/2025': 'boars', '1/21/2025': 'wrapt', '1/22/2025': 'slave', '1/23/2025': 'comic', '1/24/2025': 'sheds', '1/25/2025': 'scour', '1/26/2025': 'angel', '1/27/2025': 'maims', '1/28/2025': 'wroth', '1/29/2025': 'shank', '1/30/2025': 'yearn', '1/31/2025': 'unbar', '2/1/2025': 'faint', '2/2/2025': 'mewed', '2/3/2025': 'acute', '2/4/2025': 'bides', '2/5/2025': 'adage', '2/6/2025': 'badge', '2/7/2025': 'sworn',
  '2/8/2025': 'pella', '2/9/2025': 'labio', '2/10/2025': 'unity', '2/11/2025': 'skyey', '2/12/2025': 'prose', '2/13/2025': 'aloof', '2/14/2025': 'harts', '2/15/2025': 'adder', '2/16/2025': 'kites', '2/17/2025': 'umber', '2/18/2025': 'dicky', '2/19/2025': 'truth', '2/20/2025': 'blunt', '2/21/2025': 'twain', '2/22/2025': 'glean', '2/23/2025': 'nasty', '2/24/2025': 'slays', '2/25/2025': 'cades', '2/26/2025': 'defer', '2/27/2025': 'smock', '2/28/2025': 'gobbo', '3/1/2025': 'gusty', '3/2/2025': 'corse', '3/3/2025': 'foamy', '3/4/2025': 'balls', '3/5/2025': 'neigh', '3/6/2025': 'stews', '3/7/2025': 'niobe', '3/8/2025': 'isles', '3/9/2025': 'drest', '3/10/2025': 'chaos', '3/11/2025': 'touze', '3/12/2025': 'blest', '3/13/2025': 'slish', '3/14/2025': 'gypsy', '3/15/2025': 'sober', '3/16/2025': 'zeals', '3/17/2025': 'spice', '3/18/2025': 'tilts', '3/19/2025': 'ungot', '3/20/2025': 'grise', '3/21/2025': 'scowl', '3/22/2025': 'sawed', '3/23/2025': 'banes', '3/24/2025': 'hiren', '3/25/2025': 'pecks', '3/26/2025': 'kibes', '3/27/2025': 'cates', '3/28/2025': 'drunk', '3/29/2025': 'blabs', '3/30/2025': 'abuse', '3/31/2025': 'bemet', '4/1/2025': 'theft', '4/2/2025': 'eaves', '4/3/2025': 'stain', '4/4/2025': 'crete', '4/5/2025': 'metre', '4/6/2025': 'pedro', '4/7/2025': 'inlay', '4/8/2025': 'vexed', '4/9/2025': 'dwarf', '4/10/2025': 'truly', '4/11/2025': 'galen', '4/12/2025': 'sprat', '4/13/2025': 'lousy', '4/14/2025': 'grime', '4/15/2025': 'appal',
  '4/16/2025': 'rooky', '4/17/2025': 'loyal', '4/18/2025': 'witty', '4/19/2025': 'wrens', '4/20/2025': 'filth', '4/21/2025': 'gouty', '4/22/2025': 'vices', '4/23/2025': 'aesop', '4/24/2025': 'husht', '4/25/2025': 'busky', '4/26/2025': 'fifes', '4/27/2025': 'scent', '4/28/2025': 'amort', '4/29/2025': 'ripen', '4/30/2025': 'thrum', '5/1/2025': 'drave', '5/2/2025': 'rears', '5/3/2025': 'bitch', '5/4/2025': 'mates', '5/5/2025': 'qualm', '5/6/2025': 'bouts', '5/7/2025': 'leech', '5/8/2025': 'quips', '5/9/2025': 'jerks', '5/10/2025': 'perge', '5/11/2025': 'burgh', '5/12/2025': 'tufts', '5/13/2025': 'hurls', '5/14/2025': 'ruler', '5/15/2025': 'hives', '5/16/2025': 'goose', '5/17/2025': 'sighs', '5/18/2025': 'tabor', '5/19/2025': 'abate', '5/20/2025': 'wharf', '5/21/2025': 'sport', '5/22/2025': 'amiss', '5/23/2025': 'berri', '5/24/2025': 'abbot', '5/25/2025': 'usurp', '5/26/2025': 'carat', '5/27/2025': 'brine', '5/28/2025': 'celia', '5/29/2025': 'pikes', '5/30/2025': 'wooed', '5/31/2025': 'bourn', '6/1/2025': 'lieve', '6/2/2025': 'babes', '6/3/2025': 'eyrie', '6/4/2025': 'abide', '6/5/2025': 'turks', '6/6/2025': 'swine', '6/7/2025': 'state', '6/8/2025': 'spelt', '6/9/2025': 'jacks', '6/10/2025': 'dross', '6/11/2025': 'shuns', '6/12/2025': 'tipsy', '6/13/2025': 'false', '6/14/2025': 'nilus', '6/15/2025': 'fells', '6/16/2025': 'crabs', '6/17/2025': 'needy', '6/18/2025': 'spite', '6/19/2025': 'robed', '6/20/2025': 'slink', '6/21/2025': 'pulse',
  '6/22/2025': 'colts', '6/23/2025': 'pagan', '6/24/2025': 'jowls', '6/25/2025': 'aught', '6/26/2025': 'brews', '6/27/2025': 'flies', '6/28/2025': 'hullo', '6/29/2025': 'dames', '6/30/2025': 'smelt', '7/1/2025': 'eagle', '7/2/2025': 'pinch', '7/3/2025': 'caret', '7/4/2025': 'lovel', '7/5/2025': 'worts', '7/6/2025': 'bribe', '7/7/2025': 'doest', '7/8/2025': 'beest', '7/9/2025': 'gouts', '7/10/2025': 'fists', '7/11/2025': 'swath', '7/12/2025': 'padua', '7/13/2025': 'damon', '7/14/2025': 'trice', '7/15/2025': 'brawn', '7/16/2025': 'utter', '7/17/2025': 'waxes', '7/18/2025': 'exult', '7/19/2025': 'troll', '7/20/2025': 'ravin', '7/21/2025': 'bower', '7/22/2025': 'salve', '7/23/2025': 'balms', '7/24/2025': 'cital', '7/25/2025': 'hovel', '7/26/2025': 'thief', '7/27/2025': 'coign', '7/28/2025': 'satin', '7/29/2025': 'hoofs', '7/30/2025': 'shent', '7/31/2025': 'imbar', '8/1/2025': 'plats', '8/2/2025': 'henry', '8/3/2025': 'belch', '8/4/2025': 'pithy', '8/5/2025': 'afoot', '8/6/2025': 'wrest', '8/7/2025': 'cuffs', '8/8/2025': 'aloes', '8/9/2025': 'vouch', '8/10/2025': 'spurn', '8/11/2025': 'actor', '8/12/2025': 'enemy', '8/13/2025': 'wails', '8/14/2025': 'womby', '8/15/2025': 'godly', '8/16/2025': 'herne', '8/17/2025': 'douts', '8/18/2025': 'sheen', '8/19/2025': 'guilt', '8/20/2025': 'unpeg', '8/21/2025': 'venge', '8/22/2025': 'amity', '8/23/2025': 'mimic', '8/24/2025': 'clays', '8/25/2025': 'ulcer', '8/26/2025': 'manor', '8/27/2025': 'finch',
  '8/28/2025': 'midas', '8/29/2025': 'amber', '8/30/2025': 'stray', '8/31/2025': 'pride', '9/1/2025': 'spied', '9/2/2025': 'foals', '9/3/2025': 'mummy', '9/4/2025': 'forgo', '9/5/2025': 'taunt', '9/6/2025': 'rheum', '9/7/2025': 'array', '9/8/2025': 'soles', '9/9/2025': 'sieve', '9/10/2025': 'doted', '9/11/2025': 'snuff', '9/12/2025': 'shrow', '9/13/2025': 'ducks', '9/14/2025': 'strut', '9/15/2025': 'angus', '9/16/2025': 'abode', '9/17/2025': 'useth', '9/18/2025': 'sueth', '9/19/2025': 'asses', '9/20/2025': 'twine', '9/21/2025': 'mould', '9/22/2025': 'wards', '9/23/2025': 'writs', '9/24/2025': 'casca', '9/25/2025': 'plume', '9/26/2025': 'fairy', '9/27/2025': 'guest', '9/28/2025': 'curio', '9/29/2025': 'studs', '9/30/2025': 'lover', '10/1/2025': 'stead', '10/2/2025': 'asaph', '10/3/2025': 'booty', '10/4/2025': 'curds', '10/5/2025': 'crudy', '10/6/2025': 'tripe', '10/7/2025': 'compt', '10/8/2025': 'token', '10/9/2025': 'louts', '10/10/2025': 'blent', '10/11/2025': 'cloak', '10/12/2025': 'verge', '10/13/2025': 'luces', '10/14/2025': 'knits', '10/15/2025': 'fangs', '10/16/2025': 'peace', '10/17/2025': 'hulks', '10/18/2025': 'deckt', '10/19/2025': 'sedgy', '10/20/2025': 'palms', '10/21/2025': 'clare', '10/22/2025': 'hairy', '10/23/2025': 'pigmy', '10/24/2025': 'hydra', '10/25/2025': 'spoil', '10/26/2025': 'goats', '10/27/2025': 'harpy', '10/28/2025': 'cynic', '10/29/2025': 'gules', '10/30/2025': 'armor', '10/31/2025': 'snarl',
  '11/1/2025': 'ranks', '11/2/2025': 'hutch', '11/3/2025': 'whist', '11/4/2025': 'petty', '11/5/2025': 'irish', '11/6/2025': 'arrow', '11/7/2025': 'pepin', '11/8/2025': 'wrack', '11/9/2025': 'perch', '11/10/2025': 'parch', '11/11/2025': 'incur', '11/12/2025': 'maria', '11/13/2025': 'mirth', '11/14/2025': 'sluts', '11/15/2025': 'fancy', '11/16/2025': 'beefs', '11/17/2025': 'poins', '11/18/2025': 'wombs', '11/19/2025': 'scorn', '11/20/2025': 'mites', '11/21/2025': 'dying', '11/22/2025': 'altar', '11/23/2025': 'chare', '11/24/2025': 'gower', '11/25/2025': 'mated', '11/26/2025': 'toads', '11/27/2025': 'fordo', '11/28/2025': 'shave', '11/29/2025': 'crime', '11/30/2025': 'cedar', '12/1/2025': 'adorn', '12/2/2025': 'merry', '12/3/2025': 'saucy', '12/4/2025': 'burly', '12/5/2025': 'milan', '12/6/2025': 'damns', '12/7/2025': 'nonny', '12/8/2025': 'souls', '12/9/2025': 'bagot', '12/10/2025': 'knobs'}

  let currentWord = words[currentDate];

  const bard_not_five_letters = ["Give me 5 letters, sirrah!", "Give me 5 letters, villain!",
                                "Give me 5 letters, young fry of treachery!", "'Tis not 5 letters thou rump-fed runion.",
                                "'Tis not 5 letters thou cream-faced loon.", "'Tis not 5 letters thou scurvy scullion.",
                                "'Tis not 5 letters thou saucy rogue.", "'Tis not 5 letters thou finical fustilarian.",
                                "'Tis not 5 letters thou bunch-backed toad.", "'Tis not 5 letters thou lily-livered rampallian.",
                                "'Tis not 5 letters thou rascally knave."];

  const bard_not_valid_word = ["Fie! 'Tis rubbish!", "Pah! 'Tis not a word!",
                                "How now? What English is this?", "What, you egg!", "Is that French?"];

  const bard_win = {'1': ["Fie! Impossible!", "Go to, you are too shrewd."],
                    '2-3': ["Marry, you are too shrewd.", "Thy wit is as quick as the greyhound’s mouth.", "Thou witty fellow!"],
                    '4': ["Thy wit is a very bitter sweeting, it is a most sharp sauce.", "Marry, thou hast a fine wit.", "Thou witty fellow!", "Thy wit is as quick as the greyhound’s mouth."],
                    '5-6': ["Better a witty fool than a foolish wit.", "Go to, thou art a witty fool."]};

  const bard_loss = ['Fie! Thou damned and luxurious mountain goat.', 'Fie! Thou lump of foul deformity.',
                      'Fie! Thou hast no more brain than I have in mine elbows!', 'Fie! Thou sodden-witted lord!',
                      'Fie! Thy brain is as dry as the remainder biscuit after a voyage.', 'Fie! Thou art the cap of all the fools.',
                      'Fie! Thou hast not so much brain as ear-wax.', "Fie! Thou art proclaim'd fool.",
                      "You are not worth another word, else I'd call you knave.", 'What, you egg!'];


  const alert_duration = 1100;

  initLocalStorage();
  initHelpModal();
  initStatsModal();
  createSquares();
  addKeyboardClicks();
  addKeyboardTyping();
  loadLocalStorage();
  // getNewWord();


  function initLocalStorage() {
    const storedCurrentDate = window.localStorage.getItem('currentDate');
    if (!storedCurrentDate) {
      window.localStorage.setItem('currentDate', currentDate);
    } else {

      if (currentDate != storedCurrentDate) {
        getWord();
        resetGameState();
        window.localStorage.setItem('currentDate', currentDate);
        document.location.reload();
      }
    }

    const storedCurrentWord = window.localStorage.getItem('currentWord');
    if (!storedCurrentWord) {
      window.localStorage.setItem('currentWord', currentWord);
    } else {
      // local storage only stores strings, so have to convert back to number
      currentWord = storedCurrentWord;
    }

  }

  function loadLocalStorage() {
    currentWord = window.localStorage.getItem('currentWord') || currentWord;
    guessedWordCount = Number(window.localStorage.getItem('guessedWordCount')) || guessedWordCount;
    availableSpace = Number(window.localStorage.getItem('availableSpace')) || availableSpace;
    guessedWords = JSON.parse(window.localStorage.getItem('guessedWords')) || guessedWords;
    currentDate = Number(window.localStorage.getItem('currentDate')) || currentDate;
    gameOver = Number(window.localStorage.getItem('gameOver')) || gameOver;

    const storedBoardContainer = window.localStorage.getItem('boardContainer');
    if (storedBoardContainer) {
      document.getElementById('board-container').innerHTML = storedBoardContainer;
    }

    const storedKeyboardContainer = window.localStorage.getItem('keyboardContainer');
    if (storedKeyboardContainer) {
      document.getElementById('keyboard-container').innerHTML = storedKeyboardContainer;
      addKeyboardClicks();
    }
  }

  function resetGameState() {
    window.localStorage.removeItem("guessedWordCount");
    window.localStorage.removeItem("guessedWords");
    window.localStorage.removeItem("keyboardContainer");
    window.localStorage.removeItem("boardContainer");
    window.localStorage.removeItem("availableSpace");
    window.localStorage.removeItem("gameOver");
  }

  function getWord() {
    currentWord = words[currentDate];
    window.localStorage.setItem('currentWord', currentWord);
  }

  // const animateCSS = (node, animation, prefix = 'animate__') =>
//
  //   // We create a Promise and return it
  //   new Promise((resolve, reject) => {
  //   const animationName = `${prefix}${animation}`;
//
  //   node.classList.add(`${prefix}animated`, animationName);
//
  //   // When the animation ends, we clean the classes and resolve the Promise
  //   function handleAnimationEnd(event) {
  //       event.stopPropagation();
  //       node.classList.remove(`${prefix}animated`, animationName);
  //       resolve('Animation ended');
  //   }
//
  //   node.addEventListener('animationend', handleAnimationEnd, {once: true});
  //   });

  // gets random word from wordsapi
  // function getNewWord() {
  //   fetch(
  //     `https://wordsapiv1.p.rapidapi.com/words/?random=true&letters=5&frequencymin=7`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
  //         "x-rapidapi-key": "f67c21006bmshc510e9bc5e7aca9p14c25djsn0ad143dca1b8",
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((res) => {
  //       currentWord = res.word;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let i = 0; i < 30; i++) {
      let square = document.createElement("div");
      square.classList.add("animate__animated");
      square.classList.add("square");
      square.setAttribute("id", i + 1);
      gameBoard.appendChild(square);
    }
  }

  function preserveGameState() {
    window.localStorage.setItem('guessedWords', JSON.stringify(guessedWords));

    const keyboardContainer = document.getElementById('keyboard-container');
    window.localStorage.setItem('keyboardContainer', keyboardContainer.innerHTML);

    const boardContainer = document.getElementById('board-container');
    window.localStorage.setItem('boardContainer', boardContainer.innerHTML);
  }

  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedLetters(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(availableSpace);

      availableSpaceEl.textContent = letter;
      availableSpace = availableSpace + 1;
    }
  }

  // function showResult() {
  //   const finalResultEl = document.getElementById("final-score");
  //   finalResultEl.textContent = "Wordle 1 - You win!";
  // }

  // function showLosingResult() {
  //   const finalResultEl = document.getElementById("final-score");
  //   finalResultEl.textContent = `Wordle 1 - Unsuccessful Today!`;
  // }

  // function clearBoard() {
  //   for (let i = 0; i < 30; i++) {
  //     let square = document.getElementById(i + 1);
  //     square.textContent = "";
  //   }
//
  //   const keys = document.getElementsByClassName("keyboard-button");
//
  //   for (var key of keys) {
  //     key.disabled = true;
  //   }
  // }

  function getIndicesOfLetter(letter, arr) {
    const indices = [];
    let idx = arr.indexOf(letter);
    while (idx != -1) {
      indices.push(idx);
      idx = arr.indexOf(letter, idx + 1);
    }
    return indices;
  }

  function getTileClass(letter, index, currentWordArr) {
    const isCorrectLetter = currentWord
      .toUpperCase()
      .includes(letter.toUpperCase());

    if (!isCorrectLetter) {
      return "incorrect-letter";
    }

    const letterInThatPosition = currentWord.charAt(index);
    const isCorrectPosition =
      letter.toLowerCase() === letterInThatPosition.toLowerCase();

    if (isCorrectPosition) {
      return "correct-letter-in-place";
    }

    const isGuessedMoreThanOnce =
      currentWordArr.filter((l) => l === letter).length > 1;

    if (!isGuessedMoreThanOnce) {
      return "correct-letter";
    }

    const existsMoreThanOnce =
      currentWord.split("").filter((l) => l === letter).length > 1;

    // is guessed more than once and exists more than once
    if (existsMoreThanOnce) {
      return "correct-letter";
    }

    const hasBeenGuessedAlready = currentWordArr.indexOf(letter) < index;

    const indices = getIndicesOfLetter(letter, currentWord.split(""));
    const otherIndices = indices.filter((i) => i !== index);
    const isGuessedCorrectlyLater = otherIndices.some(
      (i) => i > index && currentWordArr[i] === letter
    );

    if (!hasBeenGuessedAlready && !isGuessedCorrectlyLater) {
      return "correct-letter";
    }

    return "incorrect-letter";
  }

  function updateTotalGames() {
    const totalGames = window.localStorage.getItem('totalGames') || 0;
    window.localStorage.setItem('totalGames', Number(totalGames) + 1);
  }

  function updateStatsPostWin() {
    const totalWins = window.localStorage.getItem('totalWins') || 0;
    window.localStorage.setItem('totalWins', Number(totalWins) + 1);

    const currentStreak = window.localStorage.getItem('currentStreak') || 0;
    window.localStorage.setItem('currentStreak', Number(currentStreak) + 1);
  }

  function updateStatsPostLoss() {
    window.localStorage.setItem('currentStreak', 0);
  }


  async function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    const guessedWord = currentWordArr.join("");

    if (guessedWord.length !== 5) {
      // const firstLetterId = guessedWordCount * 5 + 1;
      // currentWordArr.forEach((letter, index) => {
//
      //   const letterId = firstLetterId + index;
      //   const letterEl = document.getElementById(letterId);
//
      //   animateCSS(letterEl, "headShake");
      // });

      var popUp = document.getElementById('alert');
      let message = bard_not_five_letters[Math.floor(Math.random()*bard_not_five_letters.length)];
      popUp.textContent = message;
      $('#alert').show();

      setTimeout(() => {
        $('#alert').fadeOut('slow');
      }, alert_duration);

      return;
    }

    try {
       const res = await fetch(
         `https://wordsapiv1.p.rapidapi.com/words/${guessedWord.toLowerCase()}`,
         {
           method: "GET",
           headers: {
             "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
             "x-rapidapi-key": "f67c21006bmshc510e9bc5e7aca9p14c25djsn0ad143dca1b8",
           },
         }
       );

       if (!res.ok && !Object.keys(words).includes(guessedWord.toLowerCase())) {
         throw Error();
      }

      const firstLetterId = guessedWordCount * 5 + 1;

      window.localStorage.setItem("availableSpace", availableSpace);

      typingDisabled = true;

      const interval = 400;
      currentWordArr.forEach((letter, index) => {
        setTimeout(() => {
          const tileClass = getTileClass(letter, index, currentWordArr);
          if (tileClass) {
            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);
            // animateCSS(letterEl, "flipInX");
            letterEl.classList.add("animate__flipInX");
            letterEl.classList.add(tileClass);

            const keyboardEl = document.querySelector(`[data-key=${letter}]`);
            keyboardEl.classList.add(tileClass);
          }

          if (index === 4) {
            preserveGameState();
            typingDisabled = false;
          }

        }, index * interval);
      });

      guessedWordCount += 1;
      window.localStorage.setItem('guessedWordCount', guessedWordCount);

      if (guessedWord === currentWord) {
        gameOver = 1;
        window.localStorage.setItem('gameOver', gameOver);

        const interval = 2000;
        setTimeout(() => {

          const firstLetterId = (guessedWordCount - 1) * 5 + 1;
          currentWordArr.forEach((letter, index) => {

            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);

            // animateCSS(letterEl, "flip");
            letterEl.classList.add("animate__flip");
          });

        }, interval);


        var popUp = document.getElementById('alert');
        let key = '1';

        if (guessedWordCount == 1) {
          key = '1';
        }
        else if (guessedWordCount == 2 || guessedWordCount == 3) {
          key = '2-3';
        }
        else if (guessedWordCount == 4) {
          key = '4';
        }
        else {
          key = '5-6';
        }
        // console.log(key);

        let msg_list = bard_win[key];
        // console.log(msg_list);
        let message = msg_list[Math.floor(Math.random()*msg_list.length)];
        // console.log(message);
        popUp.textContent = message;

        setTimeout(() => {
          $('#alert').show();
          //updateWordIndex();
          updateTotalGames();
          updateStatsPostWin();
          // resetGameState();
          return;
        }, 3000);

        // setTimeout(() => {
        //   $('#alert').fadeOut('slow');
        //   // const okSelected = window.confirm("Nice nerd.");
        //   // if (okSelected) {
        //   //   clearBoard();
        //   //   showResult();
        //   // }
        //   return;
        // }, 6000);
      }

      if (guessedWords.length === 6 && guessedWord !== currentWord) {
        gameOver = 1;
        window.localStorage.setItem('gameOver', gameOver);

        var popUp = document.getElementById('alert');
        let message = bard_loss[Math.floor(Math.random()*bard_loss.length)];
        popUp.textContent = message + ` The BARDLE is ${currentWord.toUpperCase()}.`;

        setTimeout(() => {
          $('#alert').show();
          //updateWordIndex();
          updateTotalGames();
          updateStatsPostLoss();
          // resetGameState();
          return;
        }, 2000);
      }

      guessedWords.push([]);
    } 
    catch (_error) {
        // const firstLetterId = guessedWordCount * 5 + 1;
        // currentWordArr.forEach((letter, index) => {
//
        //   const letterId = firstLetterId + index;
        //   const letterEl = document.getElementById(letterId);
//
        //   animateCSS(letterEl, "headShake");
        // });

        var popUp = document.getElementById('alert');
        let message = bard_not_valid_word[Math.floor(Math.random()*bard_not_valid_word.length)];
        popUp.textContent = message;

        $('#alert').show();

        setTimeout(() => {
          $('#alert').fadeOut('slow');
        }, alert_duration);

    }
  }

  function handleDelete() {
    const currentWordArr = getCurrentWordArr();

    if (!currentWordArr.length) {
      return;
    }

    currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(availableSpace - 1);

    lastLetterEl.innerHTML = "";
    availableSpace = availableSpace - 1;
  }

  function addKeyboardClicks() {
    const keys = document.querySelectorAll(".keyboard-row button");
    for (let i = 0; i < keys.length; i++) {
      keys[i].addEventListener("click", ({ target }) => {
        const key = target.getAttribute("data-key");

        if (gameOver == 1|| typingDisabled) {
          return;
        }

        if (key === "enter") {
          handleSubmitWord();
          return;
        }

        if (key === "del") {
          handleDelete();
          return;
        }

        updateGuessedLetters(key);
      });
    }
  }

  function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
    }

  function addKeyboardTyping() {
    // Add event listener on keydown
    document.addEventListener('keydown', (event) => {
        const name = event.key;
        const code = event.code;

        if (gameOver == 1 || typingDisabled) {
          return;
        }

        if (name === 'Enter') {
            handleSubmitWord();
            return;
        }

        if (name === 'Backspace') {
            handleDelete();
            return;
        }

        if (!isLetter(name)) {
            return;
        }

        updateGuessedLetters(name);

    }, false);
  }

  function initHelpModal() {
    const modal = document.getElementById("help-modal");

    // Get the button that opens the modal
    const btn = document.getElementById("help");

    // Get the <span> element that closes the modal
    const span = document.getElementById("close-help");

    // When the user clicks on the button, open the modal
    btn.addEventListener("click", function () {
      modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    span.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }

  function updateStatsModal() {
    const currentStreak = window.localStorage.getItem("currentStreak");
    const totalWins = window.localStorage.getItem("totalWins");
    const totalGames = window.localStorage.getItem("totalGames");

    document.getElementById('current-streak').textContent = currentStreak;
    document.getElementById('total-played').textContent = totalGames;
    document.getElementById('total-wins').textContent = totalWins;

    const winPct = Math.round((totalWins / totalGames) * 100) || 0;
    document.getElementById('win-pct').textContent = winPct;
  }

  function initStatsModal() {
    const modal = document.getElementById("stats-modal");

    // Get the button that opens the modal
    const btn = document.getElementById("stats");

    // Get the <span> element that closes the modal
    const span = document.getElementById("close-stats");

    // When the user clicks on the button, open the modal
    btn.addEventListener("click", function () {
      // update stats here
      updateStatsModal();
      modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    span.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }
});