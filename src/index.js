/* Hash Avatars
 * Author: Thomas Krcmar (tomkrcmar@gmail.com)
 * Website: https://github.com/TomKrcmar/node-avatars
 * Copyright 2020-2021 by Thomas Krcmar. All Rights Reserved.
**/

import Driver from './Driver';
import PixelAvatarGenerator from './PixelAvatarGenerator';

export const Pixel = new Driver(new PixelAvatarGenerator());
