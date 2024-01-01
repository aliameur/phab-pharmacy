import { Platform } from 'react-native';
import axios from 'axios';

const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:9000' : 'http://10.0.2.2:9000'; 

