import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AMENITIES, AMENITY_LABELS, Amenity, Building } from '../types';

interface FilterBarProps {
  building: Building | 'All';
  query: string;
  capacity: number | null;
  amenities: Amenity[];
  onBuildingChange: (value: Building | 'All') => void;
  onQueryChange: (value: string) => void;
  onCapacityChange: (value: number | null) => void;
  onAmenitiesChange: (value: Amenity[]) => void;
}

export default function FilterBar({ building, query, capacity, amenities, onBuildingChange, onQueryChange, onCapacityChange, onAmenitiesChange }: FilterBarProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleAmenity = (amenity: Amenity) => {
    if (amenities.includes(amenity)) {
      onAmenitiesChange(amenities.filter(a => a !== amenity));
    } else {
      onAmenitiesChange([...amenities, amenity]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Tìm không gian học tập</Text>
      <View style={styles.searchRow}>
        <TextInput value={query} onChangeText={onQueryChange} placeholder="Tìm phòng hoặc thiết bị" placeholderTextColor="#9ba19c" style={styles.search} />
        <Pressable style={styles.filterBtn} onPress={() => setExpanded(!expanded)}>
          <Text style={styles.filterBtnText}>{expanded ? 'Thu gọn' : 'Lọc chi tiết'}</Text>
        </Pressable>
      </View>

      {expanded ? (
        <View style={styles.expandedContainer}>
          <Text style={styles.sectionLabel}>Tòa nhà</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
            {(['All', 'A', 'B', 'C', 'V'] as const).map(value => <Chip key={value} label={value === 'All' ? 'Tất cả' : `Tòa ${value}`} selected={building === value} onPress={() => onBuildingChange(value)} />)}
          </ScrollView>

          <Text style={styles.sectionLabel}>Sức chứa tối thiểu</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
            {[2, 10, 20].map(value => <Chip key={value} label={`${value}+ chỗ`} selected={capacity === value} onPress={() => onCapacityChange(capacity === value ? null : value)} />)}
          </ScrollView>

          <Text style={styles.sectionLabel}>Tiện ích</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
            {AMENITIES.map(value => <Chip key={value} label={AMENITY_LABELS[value]} selected={amenities.includes(value)} onPress={() => toggleAmenity(value)} />)}
          </ScrollView>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          {(['All', 'A', 'B', 'C', 'V'] as const).map(value => <Chip key={value} label={value === 'All' ? 'Tất cả tòa' : `Tòa ${value}`} selected={building === value} onPress={() => onBuildingChange(value)} />)}
          {[2, 10, 20].map(value => <Chip key={value} label={`${value}+ chỗ`} selected={capacity === value} onPress={() => onCapacityChange(capacity === value ? null : value)} />)}
          {AMENITIES.map(value => <Chip key={value} label={AMENITY_LABELS[value]} selected={amenities.includes(value)} onPress={() => toggleAmenity(value)} />)}
        </ScrollView>
      )}
    </View>
  );
}

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.chip, selected && styles.selected]}><Text style={[styles.chipText, selected && styles.selectedText]}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: '#f6f5f0', paddingBottom: 14 },
  label: { color: '#17231f', fontSize: 13, fontWeight: '700', marginBottom: 10 },
  searchRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  search: { flex: 1, backgroundColor: '#fff', borderColor: '#deded7', borderRadius: 12, borderWidth: 1, color: '#17231f', fontSize: 14, paddingHorizontal: 14, paddingVertical: 12 },
  filterBtn: { backgroundColor: '#e5e4dd', borderRadius: 12, justifyContent: 'center', paddingHorizontal: 16 },
  filterBtnText: { color: '#17231f', fontSize: 13, fontWeight: '700' },
  row: { gap: 8, paddingRight: 20 },
  expandedContainer: { gap: 12 },
  sectionLabel: { color: '#718078', fontSize: 12, fontWeight: '700', marginTop: 4 },
  chip: { backgroundColor: '#fff', borderColor: '#deded7', borderRadius: 20, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 9 },
  selected: { backgroundColor: '#17231f', borderColor: '#17231f' },
  chipText: { color: '#66736e', fontSize: 12, fontWeight: '600' },
  selectedText: { color: '#fff' },
});