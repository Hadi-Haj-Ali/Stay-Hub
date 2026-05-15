import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Search, Moon, User } from 'lucide-react-native';
import { router } from 'expo-router';

type Props = {
  search: string;
  setSearch: (text: string) => void;
  inputRef?: React.RefObject<TextInput | null>;
};

export default function HomeHeader({ search, setSearch, inputRef }: Props)  {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning!' : 'Good Evening!';

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.title}>{greeting}</Text>
          <Text style={styles.sub}>Find your place</Text>
        </View>


        <View style={styles.icons}>
          {/*<TouchableOpacity>
            <Moon size={20} color="#fff" style={{ marginRight: 14 }} />
          </TouchableOpacity>
          */}
          

          <TouchableOpacity onPress={() => router.push('/profile')}>
            <User size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Search size={18} color="#666" />

        <TextInput
        ref={inputRef}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2F4CB3',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  sub: {
    color: '#ddd',
    marginTop: 4,
  },
  icons: {
    flexDirection: 'row',
  },
  searchBox: {
    marginTop: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 48,
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
});