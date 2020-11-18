export const filterData = (searchQuery) => (record) => {
  const regex = new RegExp(searchQuery, "ig");
  if (regex.test(record.id)) {
    return true;
  }
  if (regex.test(record.name)) {
    return true;
  }
  if (regex.test(record.address)) {
    return true;
  }
  if (regex.test(record.pincode)) {
    return true;
  }
  if (record.items.filter(item => regex.test(item)).length > 0) {
    return true
  }
  return false;
}
export const transformData = (searchQuery) => (record) => {
  const regex = new RegExp(`(${searchQuery})`, "ig");
  if (regex.test(record.id)) {
    return {
      ...record,
      __id: record.id.replace(regex, '<strong>$1</strong>')
    }
  } else if (regex.test(record.name)) {
    return {
      ...record,
      __name: record.name.replace(regex, '<strong>$1</strong>')
    }
  } else if (regex.test(record.address)) {
    return {
      ...record,
      __address: record.address.replace(regex, '<strong>$1</strong>')
    }
  } else if (regex.test(record.pincode)) {
    return {
      ...record,
      __pincode: record.pincode.replace(regex, '<strong>$1</strong>')
    }
  } else {
    return {
      ...record,
      foundInItems: true
    }
  }
}